// // import web3 from './web3';
// //import MasterAuditCondition from '../build/contracts/MasterAuditCondition.json';

// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const compiledMasterAuditCondition = require('../build/contracts/MasterAuditCondition.json');

// let accounts;
// let masterAuditCondition;
// let deployedAddress;

// beforeEach(async() => {
//     accounts = await web3.eth.getAccounts();

//     masterAuditCondition = await new web3.eth.Contract(compiledMasterAuditCondition.abi, '0x9fbda871d559710256a2502a2517b794b482db40');
// });

// describe('MasterAuditCondition Tests', () => {
//     it("getCount should return 0 initially in the first account", async () => {
//         let count = await masterAuditCondition.methods.getCount().call();
//         assert.equal(count.valueOf(), 0);
//     });

//     it("insert should return index 0 after the first insert", async () => {
//         //Insert as Transaction
//         let transaction = await masterAuditCondition.methods.insert('Test Condition Text', 'Test Compare', 100, true);
//         //Get the Value back to test
//         let insertedMasterAuditCondition = await masterAuditCondition.methods.getConditionTextAtIndex(0).call();
//         //Assert the Values
//         //assert.equal(masterAuditCondition.index.valueOf(), 0);
//         assert.equal(insertedMasterAuditCondition.conditionText.valueOf(), 'Test Condition Text');
//         // assert.equal(masterAuditCondition.compare.valueOf(), 'Test Compare');
//         // assert.equal(masterAuditCondition.compare.value(), 100);
//     });
// });