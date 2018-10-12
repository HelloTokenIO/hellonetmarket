pragma solidity ^ 0.4 .24;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/AuditCriteriaManager.sol";

contract TestAuditCriteriaManager {
    AuditCriteriaManager criteria = AuditCriteriaManager(DeployedAddresses.AuditCriteriaManager());

    function testIsCriteria() public {
        bool expected = false;
        bool result = criteria.isCriteria(1); 
        Assert.equal(result, expected, "There is no Audit Criteria Exist");
    }

    function testSaveCriteria() public {
        uint256 expected = criteria.getCriteriaCount();
        uint256 result = criteria.insertCriteria("Criteria Text",0,100,true); 
        Assert.equal(result, expected, "There is no Audit Criteria Exist");
    }

    function testgetCriteriaCount() public {
        
        uint256 row = 0;
        row = addFourCriterias();
        row = row + 1;

        uint256 result = criteria.getCriteriaCount();
       
        Assert.equal(result, row, "There is no Audit Criteria Exist");
    }        

    function testDeleteCriteria() public
    {
        addFourCriterias();
        criteria.deleteCriteria(2);
        uint256 results = criteria.getCriteriaCount();
        Assert.equal(results, 3, "Row deleted !");
    }

    function testDeleteAllCriteria() public
    {
        addFourCriterias();
        criteria.deleteAllCriteria();
        uint256 results = criteria.getCriteriaCount();

        Assert.equal(results, 0, "All rows deleted !");
    }

    function testGetCriteriaText() public
    {
        addFourCriterias();
        var criteriaText = criteria.getCriteriaText(0);
        Assert.equal(criteriaText, "Criteria Text 1", "Get Criteria is Success !");
    }

    function testGetStatus() public
    {
        addFourCriterias();
        bool isActive = criteria.getStatus(0);
        Assert.equal(isActive, true, "Get Criteria is Success !");
    }

    function testGetCriteriaMaxScore() public
    {
        addFourCriterias();
        uint256 maxScore = criteria.getMaxScore(0);
        Assert.equal(maxScore, 500, "Get Criteria is Success !");
    }

    function testGetCriteriaMinScore() public
    {
        addFourCriterias();
        uint256 minScore = criteria.getMinScore(0);
        Assert.equal(minScore, 1, "Get Criteria is Success !");
    }

    function addFourCriterias() public
     returns(uint256 rowIndex) 
     {
        criteria.deleteAllCriteria();
        uint256 row = 0;
        row = criteria.insertCriteria("Criteria Text 1",1,500,true); 
        row = criteria.insertCriteria("Criteria Text 2",0,100,true); 
        row = criteria.insertCriteria("Criteria Text 3",0,100,true); 
        row = criteria.insertCriteria("Criteria Text 4",0,100,true); 
        return row;
    }
}