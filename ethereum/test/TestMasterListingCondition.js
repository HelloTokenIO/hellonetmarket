const MasterListingCondition = artifacts.require("MasterListingCondition");
const truffleAssert = require('truffle-assertions');

contract('MasterListingCondition', async (accounts) => {

    it("getCount should return 0 initially", async () => {
        let instance = await MasterListingCondition.deployed();
        let count = await instance.getCount.call();
        //let count = await instance.methods.getCount().call();
        assert.equal(count.valueOf(), 0);
    })

    it("inserted values should match input", async () => {
        let instance = await MasterListingCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.insert('Test Condition Text', 'Test Compare', 100, true, {
            from: accounts[0]
          });
        
        //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogInsertMasterListingCondition', (ev) => {
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
        let instance = await MasterListingCondition.deployed();
        let count = await instance.getCount.call();
        assert.equal(count.valueOf(), 1);
    });

    it("inserted values should match input after the second insert", async () => {
        let instance = await MasterListingCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.insert('Test Condition Text 2', 'Test Compare 2', 101, true, {
            from: accounts[0]
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
        let instance = await MasterListingCondition.deployed();
        let isExists = await instance.isExists.call(1);
        assert.equal(isExists, true);
    });

    it("isExists should return false for non-existing index", async () => {
        let instance = await MasterListingCondition.deployed();
        let isExists = await instance.isExists.call(10);
        assert.equal(isExists, false);
    });

    it("changeStatus to Inactive", async () => {
        let instance = await MasterListingCondition.deployed();

        let indexUnderTest = 1;
        //Change as Transaction
        let transaction = await instance.changeStatus(indexUnderTest, false, {
            from: accounts[0]
          });
        
          //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogChangeStatusMasterListingCondition', (ev) => {
            return ev.currentIndex == indexUnderTest && 
            ev.isActive == false;
        });

        //Get the Value back to test
        let changedStatus = await instance.getStatusAtIndex.call(indexUnderTest);

        //Assert the Values
        assert.equal(changedStatus, false);
    });

    it("changeStatus to Active", async () => {
        let instance = await MasterListingCondition.deployed();
        let indexUnderTest = 1;

        //Change as Transaction
        let transaction = await instance.changeStatus(indexUnderTest, true, {
            from: accounts[0]
          });

         //assert the event emitted
         truffleAssert.eventEmitted(transaction, 'LogChangeStatusMasterListingCondition', (ev) => {
            return ev.currentIndex == indexUnderTest && 
            ev.isActive == true;
        });

        //Get the Value back to test
        let changedStatus = await instance.getStatusAtIndex.call(indexUnderTest);

        //Assert the Values
        assert.equal(changedStatus, true);
    });

    it("changeStatus on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();

        //assert the revert
        await truffleAssert.reverts(
            instance.changeStatus(10, true, {
                from: accounts[0]
              })
        );
    });

    it("updated values should match input", async () => {
        let instance = await MasterListingCondition.deployed();
        let indexUnderTest = 1;

        //Update as Transaction
        let transaction = await instance.update(indexUnderTest, 'Updated Test Condition Text 2', 'Updated Test Compare 2', 202, {
            from: accounts[0]
          });

        //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogUpdateMasterListingCondition', (ev) => {
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
        let instance = await MasterListingCondition.deployed();

         //assert the revert
         await truffleAssert.reverts(
            instance.update(99, 'Updated Test Condition Text 2', 'Updated Test Compare 2', 202, {
                from: accounts[0]
              })
        );       
    });

    it("deleteMasterListingCondition should delete", async () => {
        let instance = await MasterListingCondition.deployed();
        let indexUnderTest = 0;

        let countBeforeDelete = await instance.getCount.call();

        //Insert as Transaction
        let transaction = await instance.deleteMasterListingCondition(indexUnderTest, {
            from: accounts[0]
          });
       
        //assert the event emitted
        truffleAssert.eventEmitted(transaction, 'LogDeleteMasterListingCondition', (ev) => {
            return ev.currentIndex == indexUnderTest;
        });

          //assert the revert
        await truffleAssert.reverts(
            instance.getAtIndex.call(countBeforeDelete)
        );
    });

    it("deleteMasterListingCondition on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();

         //assert the revert
         await truffleAssert.reverts(
            instance.deleteMasterListingCondition(21, {
                from: accounts[0]
              })
        );
    });

    it("deleteAll should delete all and getCount = 0", async () => {
        let instance = await MasterListingCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.deleteAll({
            from: accounts[0]
          });
        //Get the Value back to test
        let value = await instance.getCount.call();

        //Assert the Values
        assert.equal(value, 0);
    });


    it("getAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();

         //assert the revert
         await truffleAssert.reverts(
            instance.getAtIndex.call(33)
        );
    });

    it("getConditionTextAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();

         //assert the revert
         await truffleAssert.reverts(
            instance.getConditionTextAtIndex.call(33)
        );
    });

    it("getCompareAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();

         //assert the revert
         await truffleAssert.reverts(
            instance.getCompareAtIndex.call(33)
        );
    });

    it("getValueAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();
         //assert the revert
         await truffleAssert.reverts(
            instance.getValueAtIndex.call(33)
        );
    });

    it("getStatusAtIndex on non-existing record should throw error", async () => {
        let instance = await MasterListingCondition.deployed();
         //assert the revert
         await truffleAssert.reverts(
            instance.getStatusAtIndex.call(33)
        );
    });
})