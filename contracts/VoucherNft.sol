// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VoucherNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    struct Voucher {
        uint256 id;
        string voucherType;
        address merchant;
        address owner;
        uint256 value;
    }

    mapping(uint256 => Voucher) private _vouchers;

    constructor() ERC721("VoucherNFT", "VNFT") {}

    function mintVoucherNFT(string memory voucherType, address merchant, uint256 value) public returns (uint256) {
        _tokenIds.increment();
        uint256 newVoucherId = _tokenIds.current();
        _safeMint(msg.sender, newVoucherId);
        address _owner = _msgSender();

        Voucher memory newVoucher = Voucher(newVoucherId, voucherType, merchant, _owner, value);
        _vouchers[newVoucherId] = newVoucher;

        return newVoucherId;
    }



    function getVoucherDetails(uint256 tokenId) public view returns (Voucher memory) {
        require(_exists(tokenId), "VoucherNFT: Voucher does not exist");
        return _vouchers[tokenId];
    }
}