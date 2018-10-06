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

* Pre Requisite
```
Install Visual C++ Build Environment: Visual Studio Build Tools (using "Visual C++ build tools" workload) or Visual Studio 2017 Community (using the "Desktop development with C++" workload)

Install Python 2.7 (v3.x.x is not supported), and run npm config set python python2.7 (or see below for further instructions on specifying the proper Python version and path.)

Launch cmd, npm config set msvs_version 2017
If the above steps didn't work for you, please visit Microsoft's Node.js Guidelines for Windows for additional tips.
```
https://github.com/nodejs/node-gyp

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
