const MasterAuditCondition = artifacts.require("MasterAuditCondition");

contract('TestMasterAuditCondition.js', async (accounts) => {

    it("getCount should return 0 initially", async () => {
        let instance = await MasterAuditCondition.deployed();
        let count = await instance.getCount.call();
        //let count = await instance.methods.getCount().call();
        assert.equal(count.valueOf(), 0);
    })

    it("inserted values should match input after the first insert", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Insert as Transaction
        let transaction = await instance.insert('Test Condition Text', 'Test Compare', 100, true, {
            from: accounts[0],
            gas: '1000000'
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
        //Change as Transaction
        let transaction = await instance.changeStatus(1, false, {
            from: accounts[0],
            gas: '1000000'
          });
        //Get the Value back to test
        let changedStatus = await instance.getStatusAtIndex.call(1);

        //Assert the Values
        assert.equal(changedStatus, false);
    });

    it("changeStatus to Active", async () => {
        let instance = await MasterAuditCondition.deployed();
        //Change as Transaction
        let transaction = await instance.changeStatus(1, true, {
            from: accounts[0],
            gas: '1000000'
          });
        //Get the Value back to test
        let changedStatus = await instance.getStatusAtIndex.call(1);

        //Assert the Values
        assert.equal(changedStatus, true);
    });

    it("changeStatus on non-existing record", async () => {
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
})