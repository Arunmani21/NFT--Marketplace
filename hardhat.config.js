require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const fs = require('fs');

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/tWf0GWr6VDzmJwTwrtMmf6tGrYPsWWR0",
      accounts : ["1f205ea4fe7bc73ee8f0a3c4f8721285d6c627bea884ac8528c14f1c9bc1b825"]
    },
    
sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Ljk33w3t75pVzqkecJRtVfdHSLupy1T8",
      accounts:["1f205ea4fe7bc73ee8f0a3c4f8721285d6c627bea884ac8528c14f1c9bc1b825"]
    }

  },
  etherscan: {
    apiKey:"M79HAA8SRUBSV552VBTYQ63KYUTCAKV926"
 },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};