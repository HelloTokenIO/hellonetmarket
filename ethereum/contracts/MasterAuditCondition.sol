pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract MasterAuditCondition {
    struct MasterAuditConditionStruct{
        uint256 index;
        string conditionText;
        string compare;
        uint value;
        bool isActive;        
    }

    mapping(uint256 => MasterAuditConditionStruct) private MasterAuditConditionStructs;
    uint256[] private Index;

    function insert(
        string conditionText,
        string compare,
        uint value,
        bool isActive
    )
    public 
    returns(uint256 index)
    {
        uint256 currentIndex = getCount();

        MasterAuditConditionStruct memory newMasterAuditConditionStruct = MasterAuditConditionStruct(currentIndex, conditionText, compare, value, isActive);
        MasterAuditConditionStructs[currentIndex] = newMasterAuditConditionStruct;
        Index.push(currentIndex);
        return currentIndex;
    }

    function getCount()
    public
    constant
    returns(uint256 count) {
        return Index.length;
    }

    function getAtIndex(uint256 index)
    public
    constant
    returns(MasterAuditConditionStruct masterAuditConditionStruct)
    {
        return MasterAuditConditionStructs[index];
    }

    function getConditionTextAtIndex(uint256 index)
    public
    constant
    returns(string conditionText)
    {
        return MasterAuditConditionStructs[index].conditionText;
    }

    function getCompareAtIndex(uint256 index)
    public
    constant
    returns(string compare)
    {
        return MasterAuditConditionStructs[index].compare;
    }

    function getValueAtIndex(uint256 index)
    public
    constant
    returns(uint256 value)
    {
        return MasterAuditConditionStructs[index].value;
    }
}