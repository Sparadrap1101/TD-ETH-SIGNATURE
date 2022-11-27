const { network, ethers } = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [];

  const contract = await deploy("Contract", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 6,
  });

  const { verify } = require("../utils/verify.js");

  const developmentChains = ["hardhat", "localhost"];

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(contract.address, args);
  }
  log("--------------------------------");

  module.exports.tags = ["all", "contract"];
};
