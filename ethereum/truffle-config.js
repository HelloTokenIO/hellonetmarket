const HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
    migrations_directory: "./migrations",
    networks: {
      // development: {
      //   host: "localhost",
      //   port: 7545,
      //   network_id: "*" // Match any network id
      // },
      rinkeby: {
        provider: new HDWalletProvider("lizard around pond million income buffalo kick best volume brown blossom old", "https://rinkeby.infura.io/zDgeQjWC1bsqjYMRpJqH", 4),
        network_id: '3'            
       
        }
    }
  };
  