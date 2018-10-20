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

    function deleteMasterAuditCondition(uint256 deleteIndex) 
    public
    returns(uint256 index){
        if (!(isExists(deleteIndex))) revert();

        //important since deleteIndex <> MasterAuditConditionStructs[deleteIndex].index
        uint256 rowToDeleteIndex = MasterAuditConditionStructs[deleteIndex].index;
        //Get the Last index/key
        uint256 keyToMoveIndex = Index[Index.length - 1];
        //Set the rowToDelete index as Last Index
        Index[rowToDeleteIndex] = keyToMoveIndex;
        //Set the moved struct's index as rowToDelete Index
        MasterAuditConditionStructs[keyToMoveIndex].index = rowToDeleteIndex;
        Index.length--;

        return rowToDeleteIndex;
    }

    function deleteAll()
    public{
        delete Index;
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
        if (!(isExists(index))) revert();

        return MasterAuditConditionStructs[index];
    }

    function getConditionTextAtIndex(uint256 index)
    public
    view
    returns(string conditionText)
    {
        if (!(isExists(index))) revert();

        return MasterAuditConditionStructs[index].conditionText;
    }

    function getCompareAtIndex(uint256 index)
    public
    view
    returns(string compare)
    {
        if (!(isExists(index))) revert();

        return MasterAuditConditionStructs[index].compare;
    }

    function getValueAtIndex(uint256 index)
    public
    view
    returns(uint256 value)
    {
        if (!(isExists(index))) revert();

        return MasterAuditConditionStructs[index].value;
    }

    function getStatusAtIndex(uint256 index)
    public
    view
    returns(bool isActive)
    {
        if (!(isExists(index))) revert();
        
        return MasterAuditConditionStructs[index].isActive;
    }
}