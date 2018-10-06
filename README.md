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
Install Visual C++ Build Environment: Visual Studio Build Tools (using "Visual C++ build tools" workload) 
Install Python 2.7 (v3.x.x is not supported), and run npm config set python python2.7 
Launch cmd, npm config set msvs_version 2017
```
https://github.com/nodejs/node-gyp

* HD Wallet-enabled Web3 provider.Use it to sign transactions for addresses derived from a 12-word mnemonic.

```
npm install truffle-hdwallet-provider
```

## To Deploy Smart Contracts
1. cd ethereum
2. truffle compile
3. ganache-cli
4. truffle migrate
```
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x30885e36b79835b63a9fe56306ef68d1b8c05142144b3e2c49d44c729a23742f
  Migrations: 0x9c1066b87d8c216987accd4ef5c056caf831e6a7
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Running step...
  Deploying JobApplicationLibrary...
  ... 0xce3fe6daffb98c6abb7c3938669a5cef65fad622052a4900498ec4cb783741d2
  JobApplicationLibrary: 0x69b925072040fb2f45de40e4e4812cd768f9ffcd
  Linking JobApplicationLibrary to ListingsRegistry
  Linking JobApplicationLibrary to Listing
  Deploying ListingsRegistry...
  ... 0xf9abfd4f58c41c92fdb4f3905debf9c71a3d0fcdd5de0e2b93dbd76c02dadcae
  ListingsRegistry: 0x7c9533d4797062cf4b59cd55711e6a4693887090
Saving artifacts...
```
5. Copy the "ListingsRegistry" address to "listingsregistry.js"
6. cd..

## To run the dApp on localhost:3000
1. npm run dev



## To run the App using local Ganache
1. make sure web3.js points to localhost

## To run the App using Rinkeby
1. make sure web3.js points to Rinkeby


## To View IPFS files
https://ipfs.io/ipfs/zb2rhbphRuwA8kSUq7y7r9FXgd8cBF1TRXzhcqrdbVsu7NQJH
