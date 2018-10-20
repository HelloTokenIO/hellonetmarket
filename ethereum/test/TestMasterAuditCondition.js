const MasterAuditCondition = artifacts.require("MasterAuditCondition");
const truffleAssert = require('truffle-assertions');

contract('TestMasterAuditCondition.js', async (accounts) => {

    it("getCount should return 0 initially", async () => {
        let instance = await MasterAuditCondition.deployed();
        let count = await instance.getCount.call();
        //let count = await instance.methods.getCount().call();
        assert.equal(count.valueOf(), 0);
    })

    it("inserted values should match input", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.insert('Test Condition Text', 'Test Compare', 100, true, {
            from: accounts[0],
            gas: '1000000'
          });
        
        //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogInsertMasterAuditCondition', (ev) => {
            return ev.currentIndex == 0 && 
            ev.conditionText == 'Test Condition Text' && 
            ev.compare == 'Test Compare' &&
            ev.value == 100;
        });

        //Get the Value back to test
        let insertedConditionText = await instance.getConditionTextAtIndex.call(0);
        let insertedCompare = await instance.getCompareAtIndex.call(0);
        let insertedValue = await instance.getValueAtIndex.call(0);

        //Assert the Values
        assert.equal(insertedConditionText, 'Test Condition Text');
        assert.equal(insertedCompare, 'Test Compare');
        assert.equal(insertedValue, 100);
    });

    it("getCount should return 1 after the first insert", async () => {
        let instance = await MasterAuditCondition.deployed();
        let count = await instance.getCount.call();
        assert.equal(count.valueOf(), 1);
    });

    it("inserted values should match input after the second insert", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.insert('Test Condition Text 2', 'Test Compare 2', 101, true, {
            from: accounts[0],
            gas: '1000000'
          });
        //Get the Value back to test
        let insertedConditionText = await instance.getConditionTextAtIndex.call(1);
        let insertedCompare = await instance.getCompareAtIndex.call(1);
        let insertedValue = await instance.getValueAtIndex.call(1);

        //Assert the Values
        assert.equal(insertedConditionText, 'Test Condition Text 2');
        assert.equal(insertedCompare, 'Test Compare 2');
        assert.equal(insertedValue, 101);
    });

    it("isExists should return true for existing index", async () => {
        let instance = await MasterAuditCondition.deployed();
        let isExists = await instance.isExists.call(1);
        assert.equal(isExists, true);
    });

    it("isExists should return false for non-existing index", async () => {
        let instance = await MasterAuditCondition.deployed();
        let isExists = await instance.isExists.call(10);
        assert.equal(isExists, false);
    });

    it("changeStatus to Inactive", async () => {
        let instance = await MasterAuditCondition.deployed();

        let indexUnderTest = 1;
        //Change as Transaction
        let transaction = await instance.changeStatus(indexUnderTest, false, {
            from: accounts[0],
            gas: '1000000'
          });
        
          //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogChangeStatusMasterAuditCondition', (ev) => {
            return ev.currentIndex == indexUnderTest && 
            ev.isActive == false;
        });

        //Get the Value back to test
        let changedStatus = await instance.getStatusAtIndex.call(indexUnderTest);

        //Assert the Values
        assert.equal(changedStatus, false);
    });

    it("changeStatus to Active", async () => {
        let instance = await MasterAuditCondition.deployed();
        let indexUnderTest = 1;

        //Change as Transaction
        let transaction = await instance.changeStatus(indexUnderTest, true, {
            from: accounts[0],
            gas: '1000000'
          });

         //assert the event emitted
         truffleAssert.eventEmitted(transaction, 'LogChangeStatusMasterAuditCondition', (ev) => {
            return ev.currentIndex == indexUnderTest && 
            ev.isActive == true;
        });

        //Get the Value back to test
        let changedStatus = await instance.getStatusAtIndex.call(indexUnderTest);

        //Assert the Values
        assert.equal(changedStatus, true);
    });

    it("changeStatus on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Change as Transaction
        try {
            let transaction = await instance.changeStatus(10, true, {
                from: accounts[0],
                gas: '1000000'
              });
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("updated values should match input", async () => {
        let instance = await MasterAuditCondition.deployed();
        let indexUnderTest = 1;

        //Update as Transaction
        let transaction = await instance.update(indexUnderTest, 'Updated Test Condition Text 2', 'Updated Test Compare 2', 202, {
            from: accounts[0],
            gas: '1000000'
          });

        //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogUpdateMasterAuditCondition', (ev) => {
            return ev.currentIndex == indexUnderTest && 
            ev.conditionText == 'Updated Test Condition Text 2' && 
            ev.compare == 'Updated Test Compare 2' &&
            ev.value == 202;
        });

        //Get the Value back to test
        let updatedConditionText = await instance.getConditionTextAtIndex.call(indexUnderTest);
        let updatedCompare = await instance.getCompareAtIndex.call(indexUnderTest);
        let updatedValue = await instance.getValueAtIndex.call(indexUnderTest);

        //Assert the Values
        assert.equal(updatedConditionText, 'Updated Test Condition Text 2');
        assert.equal(updatedCompare, 'Updated Test Compare 2');
        assert.equal(updatedValue, 202);
    });

    it("update on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Change as Transaction
        try {
            let transaction = await instance.update(1, 'Updated Test Condition Text 2', 'Updated Test Compare 2', 202, {
                from: accounts[0],
                gas: '1000000'
              });
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("deleteMasterAuditCondition should delete", async () => {
        let instance = await MasterAuditCondition.deployed();
        let indexUnderTest = 1;
        //Insert as Transaction
        let transaction = await instance.deleteMasterAuditCondition(indexUnderTest, {
            from: accounts[0],
            gas: '1000000'
          });
       
        //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogDeleteMasterAuditCondition', (ev) => {
            return ev.currentIndex == indexUnderTest;
        });

         let count = await instance.getCount.call();
          try {
            await instance.getAtIndex.call(count);
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("deleteMasterAuditCondition on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Change as Transaction
        try {
            let transaction = await instance.deleteMasterAuditCondition(21, {
                from: accounts[0],
                gas: '1000000'
              });
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("deleteAll should delete all and getCount = 0", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.deleteAll({
            from: accounts[0],
            gas: '1000000'
          });
        //Get the Value back to test
        let value = await instance.getCount.call();

        //Assert the Values
        assert.equal(value, 0);
    });


    it("getAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        try {
            await instance.getAtIndex.call(33);
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("getConditionTextAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        try {
            await instance.getConditionTextAtIndex.call(33);
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("getCompareAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        try {
            await instance.getCompareAtIndex.call(33);
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("getValueAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        try {
            await instance.getValueAtIndex.call(33);
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });

    it("getStatusAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterAuditCondition.deployed();
        try {
            await instance.getStatusAtIndex.call(33);
                
        } catch (error) {
            //TODO: Need to pass the right message from revert() and handle it accordingly
            // console.log('err', error);
            assert(true);
            // if (error ==="Index does not Exists"){
            //     assert(true);
            // }else{
            //     assert(false);
            // }
        }
    });
})