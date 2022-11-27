const { ethers, run, network } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  const contractAddress = "0x...";
  const myContract = await hre.ethers.getContractAt(
    "ContractName",
    contractAddress
  );

  const contractTokenAddress = "0x...";
  const amount = ethers.utils.parseEther("1");

  const myToken = await hre.ethers.getContractAt("ERC20", contractTokenAddress);
  const approve = await myToken.approve(contractAddress, amount);

  const deposit = await myContract.depositFunds(contractTokenAddress, amount);
  const transactionReceipt = await deposit.wait(1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
