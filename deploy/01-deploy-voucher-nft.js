const { ethers } = require("hardhat")

async function main() {
    const VoucherNFT = await ethers.getContractFactory("VoucherNFT")
    const voucherNFT = await VoucherNFT.deploy()
    await voucherNFT.deployed()
    console.log("VoucherNFT deployed to:", voucherNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
