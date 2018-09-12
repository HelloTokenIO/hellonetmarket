## HelloNetMarket
## Here, Agents, Companies and Auditors interact with each other 

## Contents
## next.js based url routing
## truffle based solidity smart contracts

### Prerequisites

What things you need to install the software and how to install them

* Node: Download from https://nodejs.org/en/
* Ganache-cli: add next line into command console

```
npm install -g ganache-cli
```

* Truffle: add next line into command console

```
npm install -g truffle 
```

* HD Wallet-enabled Web3 provider.Use it to sign transactions for addresses derived from a 12-word mnemonic.

```
npm install truffle-hdwallet-provider
```

## To Deploy Smart Contracts
1. cd ethereum
2. truffle compile
3. truffle migrate
4. Copy the "ListingsRegistry" address to "listingsregistry.js"
5. cd..

## To run the dApp on localhost:3000
1. npm run dev



## To run the App using local Ganache
1. make sure web3.js points to localhost

## To run the App using Rinkeby
1. make sure web3.js points to Rinkeby


## To View IPFS files
https://ipfs.io/ipfs/zb2rhbphRuwA8kSUq7y7r9FXgd8cBF1TRXzhcqrdbVsu7NQJH