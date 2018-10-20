pragma solidity ^0.4.24;

contract MasterListingCondition {
    struct MasterListingConditionStruct{
        uint256 index;
        string conditionText;
        string compare;
        uint value;
        bool isActive;        
    }

    mapping(uint256 => MasterListingConditionStruct) private MasterListingConditionStructs;
    uint256[] private Index;

    event LogInsertMasterListingCondition(uint256 indexed currentIndex, string conditionText, string compare, uint256 value, bool isActive);
    event LogUpdateMasterListingCondition(uint256 indexed currentIndex, string conditionText, string compare, uint256 value, bool isActive);
    event LogDeleteMasterListingCondition(uint256 indexed currentIndex);
    event LogChangeStatusMasterListingCondition(uint256 indexed currentIndex, bool isActive);
    

    function isExists(uint256 indexExists)
    public 
    view
    returns(bool isExist) {
        if (Index.length == 0) return false;

        return (Index[MasterListingConditionStructs[indexExists].index] == indexExists);
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
        MasterListingConditionStruct memory newMasterListingConditionStruct = MasterListingConditionStruct(pushedIndex, conditionText, compare, value, isActive);
        MasterListingConditionStructs[currentIndex] = newMasterListingConditionStruct;
            
        emit LogInsertMasterListingCondition(currentIndex, conditionText, compare, value, isActive);
        return currentIndex;
    }

    function changeStatus(uint256 index, bool status)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        MasterListingConditionStructs[index].isActive = status;

        emit LogChangeStatusMasterListingCondition(index, MasterListingConditionStructs[index].isActive);
        return true;
    }

    function update(uint256 index, string conditionText, string compare, uint256 value)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        MasterListingConditionStructs[index].conditionText = conditionText;
        MasterListingConditionStructs[index].compare = compare;
        MasterListingConditionStructs[index].value = value;

        emit LogUpdateMasterListingCondition(
            MasterListingConditionStructs[index].index,
            MasterListingConditionStructs[index].conditionText,
            MasterListingConditionStructs[index].compare,
            MasterListingConditionStructs[index].value, 
            MasterListingConditionStructs[index].isActive);

        return true;
    }

    function deleteMasterListingCondition(uint256 deleteIndex) 
    public
    returns(uint256 index){
        if (!(isExists(deleteIndex))) revert();

        //important since deleteIndex <> MasterListingConditionStructs[deleteIndex].index
        uint256 rowToDeleteIndex = MasterListingConditionStructs[deleteIndex].index;
        //Get the Last index/key
        uint256 keyToMoveIndex = Index[Index.length - 1];
        //Set the rowToDelete index as Last Index
        Index[rowToDeleteIndex] = keyToMoveIndex;
        //Set the moved struct's index as rowToDelete Index
        MasterListingConditionStructs[keyToMoveIndex].index = rowToDeleteIndex;
        Index.length--;

        emit LogDeleteMasterListingCondition(rowToDeleteIndex);
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

        return ( MasterListingConditionStructs[getIndex].index,
            MasterListingConditionStructs[getIndex].conditionText, 
            MasterListingConditionStructs[getIndex].compare,
            MasterListingConditionStructs[getIndex].value, 
            MasterListingConditionStructs[getIndex].isActive);
    }

    function getConditionTextAtIndex(uint256 index)
    public
    view
    returns(string conditionText)
    {
        if (!(isExists(index))) revert();

        return MasterListingConditionStructs[index].conditionText;
    }

    function getCompareAtIndex(uint256 index)
    public
    view
    returns(string compare)
    {
        if (!(isExists(index))) revert();

        return MasterListingConditionStructs[index].compare;
    }

    function getValueAtIndex(uint256 index)
    public
    view
    returns(uint256 value)
    {
        if (!(isExists(index))) revert();

        return MasterListingConditionStructs[index].value;
    }

    function getStatusAtIndex(uint256 index)
    public
    view
    returns(bool isActive)
    {
        if (!(isExists(index))) revert();
        
        return MasterListingConditionStructs[index].isActive;
    }
}