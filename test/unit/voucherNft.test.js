const { expect } = require("chai")

describe("VoucherNFT", function () {
    let VoucherNFT
    let voucherNFT

    beforeEach(async function () {
        VoucherNFT = await ethers.getContractFactory("VoucherNFT")
        voucherNFT = await VoucherNFT.deploy()
        await voucherNFT.deployed()
    })

    it("should deploy the contract", async function () {
        expect(voucherNFT.address).to.not.equal(0)
    })

    it("should mint a new voucher NFT", async function () {
        const voucherValue = 15
        const merchant = "0x1234567890123456789012345678901234567890"
        const mintTx = await voucherNFT.mintVoucherNFT("Discount", merchant, voucherValue)
        await mintTx.wait()

        const tokenId = await voucherNFT._tokenIds()

        const owner = await voucherNFT.ownerOf(tokenId)
        expect(owner).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

        const voucherDetails = await voucherNFT.getVoucherDetails(tokenId)
        expect(voucherDetails.value).to.equal(voucherValue)
        expect(voucherDetails.merchant).to.equal(merchant)
    })
})
