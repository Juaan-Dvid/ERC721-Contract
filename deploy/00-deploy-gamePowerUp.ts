import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import verify from "../helper-functions";

const deployGamePowerUp: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("------------------------------------");
  log("Deploying GamePowerUp and waiting for confirmations...");

  const args: any[] = [deployer]; // initialOwner

  const gamePowerUp: DeployResult = await deploy("GamePowerUp", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  log(`GamePowerUp deployed at ${gamePowerUp.address}`);

  if (!developmentChains.includes(network.name)) {
    await verify(gamePowerUp.address, args);
  }
};

export default deployGamePowerUp;
