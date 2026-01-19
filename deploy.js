const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Vault with account:", deployer.address);

  // 1. Deploy Strategy First (Simplified logic)
  const WantToken = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; // BUSD
  const MasterChef = "0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652"; // PancakeSwap
  const PoolID = 2;

  const Strategy = await ethers.getContractFactory("Strategy");
  const strategy = await Strategy.deploy(WantToken, MasterChef, PoolID);
  await strategy.deployed();

  console.log("Strategy deployed to:", strategy.address);

  // 2. Deploy Vault
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy(WantToken, strategy.address);
  await vault.deployed();

  console.log("Vault deployed to:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
