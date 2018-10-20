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

    event LogInsertMasterAuditCondition(uint256 indexed currentIndex, string conditionText, string compare, uint256 value, bool isActive);
    event LogUpdateMasterAuditCondition(uint256 indexed currentIndex, string conditionText, string compare, uint256 value, bool isActive);
    event LogDeleteMasterAuditCondition(uint256 indexed currentIndex);
    event LogChangeStatusMasterAuditCondition(uint256 indexed currentIndex, bool isActive);
    

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

        uint256 pushedIndex = Index.push(currentIndex) - 1;
        MasterAuditConditionStruct memory newMasterAuditConditionStruct = MasterAuditConditionStruct(pushedIndex, conditionText, compare, value, isActive);
        MasterAuditConditionStructs[currentIndex] = newMasterAuditConditionStruct;
            
        emit LogInsertMasterAuditCondition(currentIndex, conditionText, compare, value, isActive);
        return currentIndex;
    }

    function changeStatus(uint256 index, bool status)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        MasterAuditConditionStructs[index].isActive = status;

        emit LogChangeStatusMasterAuditCondition(index, MasterAuditConditionStructs[index].isActive);
        return true;
    }

    function update(uint256 index, string conditionText, string compare, uint256 value)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        MasterAuditConditionStructs[index].conditionText = conditionText;
        MasterAuditConditionStructs[index].compare = compare;
        MasterAuditConditionStructs[index].value = value;

        emit LogUpdateMasterAuditCondition(
            MasterAuditConditionStructs[index].index,
            MasterAuditConditionStructs[index].conditionText,
            MasterAuditConditionStructs[index].compare,
            MasterAuditConditionStructs[index].value, 
            MasterAuditConditionStructs[index].isActive);

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

        emit LogDeleteMasterAuditCondition(rowToDeleteIndex);
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

    function getAtIndex(uint256 getIndex)
    public
    view
    returns(uint256 index,
        string conditionText,
        string compare,
        uint value,
        bool isActive)
    {
        if (!(isExists(getIndex))) revert();

        return ( MasterAuditConditionStructs[getIndex].index,
            MasterAuditConditionStructs[getIndex].conditionText, 
            MasterAuditConditionStructs[getIndex].compare,
            MasterAuditConditionStructs[getIndex].value, 
            MasterAuditConditionStructs[getIndex].isActive);
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