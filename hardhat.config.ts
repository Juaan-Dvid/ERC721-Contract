import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";

dotenv.config();

const { ARBITRUM_SEPOLIA_RPC_URL, ARBISCAN_API_KEY, WALLET_PRIVATE_KEY } = process.env;

if (!ARBITRUM_SEPOLIA_RPC_URL || !ARBISCAN_API_KEY || !WALLET_PRIVATE_KEY) {
  throw new Error("Missing environment variables. Check .env");
}

const ACCOUNTS: string[] = [WALLET_PRIVATE_KEY];

const SOLC_SETTING = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const defaultNetwork: string = "hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: defaultNetwork,  
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
      url: "http://127.0.0.1:8545",
    },
    arbitrumSepolia: {
      accounts: ACCOUNTS,
      chainId: 421614,
      url: ARBITRUM_SEPOLIA_RPC_URL,
    },
  },
  etherscan: {
    apiKey: ARBISCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.23",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.22",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.21",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.20",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.19",
        settings: SOLC_SETTING,
      },
    ],
  },
  mocha: {
    timeout: 200000,
  },
};

export default config;
