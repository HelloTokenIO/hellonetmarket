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

    function isExists(uint256 indexExists)
    public 
    view
    returns(bool isExist) {
        if (Index.length == 0) return false;

        return (Index[MasterAuditConditionStructs[indexExists].index] == indexExists);
    }

    function insert(
        string conditionText,
        string compare,
        uint value,
        bool isActive
    )
    public 
    returns(uint256 index){
        uint256 currentIndex = getCount();

        MasterAuditConditionStruct memory newMasterAuditConditionStruct = MasterAuditConditionStruct(currentIndex, conditionText, compare, value, isActive);
        MasterAuditConditionStructs[currentIndex] = newMasterAuditConditionStruct;
        Index.push(currentIndex);
        return currentIndex;
    }

    function changeStatus(uint256 index, bool status)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        MasterAuditConditionStructs[index].isActive = status;
        return true;
    }

    function update(uint256 index, string conditionText, string compare, uint256 value)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        MasterAuditConditionStructs[index].conditionText = conditionText;
        MasterAuditConditionStructs[index].compare = compare;
        MasterAuditConditionStructs[index].value = value;

        return true;
    }

    function getCount()
    public
    view
    returns(uint256 count) {
        return Index.length;
    }

    function getAtIndex(uint256 index)
    public
    view
    returns(MasterAuditConditionStruct masterAuditConditionStruct)
    {
        return MasterAuditConditionStructs[index];
    }

    function getConditionTextAtIndex(uint256 index)
    public
    view
    returns(string conditionText)
    {
        return MasterAuditConditionStructs[index].conditionText;
    }

    function getCompareAtIndex(uint256 index)
    public
    view
    returns(string compare)
    {
        return MasterAuditConditionStructs[index].compare;
    }

    function getValueAtIndex(uint256 index)
    public
    view
    returns(uint256 value)
    {
        return MasterAuditConditionStructs[index].value;
    }

    function getStatusAtIndex(uint256 index)
    public
    view
    returns(bool isActive)
    {
        return MasterAuditConditionStructs[index].isActive;
    }
}