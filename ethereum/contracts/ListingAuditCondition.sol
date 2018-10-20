pragma solidity ^0.4.24;

contract ListingAuditCondition {
    struct ListingAuditConditionStruct{
        uint256 index;
        uint256 listingIndex;
        string conditionText;
        string compare;
        uint value;
        bool isActive;        
    }

    mapping(uint256 => ListingAuditConditionStruct) private ListingAuditConditionStructs;
    uint256[] private Index;

    event LogInsertListingAuditCondition(uint256 indexed currentIndex, uint256 listingIndex, string conditionText, string compare, uint256 value, bool isActive);
    event LogUpdateListingAuditCondition(uint256 indexed currentIndex, uint256 listingIndex, string conditionText, string compare, uint256 value, bool isActive);
    event LogDeleteListingAuditCondition(uint256 indexed currentIndex);
    event LogChangeStatusListingAuditCondition(uint256 indexed currentIndex, bool isActive);
    

    function isExists(uint256 indexExists)
    public 
    view
    returns(bool isExist) {
        if (Index.length == 0) return false;

        return (Index[ListingAuditConditionStructs[indexExists].index] == indexExists);
    }

    function insert(
        uint256 listingIndex, 
        string conditionText,
        string compare,
        uint value,
        bool isActive
    )
    public 
    returns(uint256 index){
        uint256 currentIndex = getCount();

        uint256 pushedIndex = Index.push(currentIndex) - 1;
        ListingAuditConditionStruct memory newListingAuditConditionStruct = ListingAuditConditionStruct(pushedIndex, listingIndex,  conditionText, compare, value, isActive);
        ListingAuditConditionStructs[currentIndex] = newListingAuditConditionStruct;
            
        emit LogInsertListingAuditCondition(currentIndex,listingIndex, conditionText, compare, value, isActive);
        return currentIndex;
    }

    function changeStatus(uint256 index, bool status)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        ListingAuditConditionStructs[index].isActive = status;

        emit LogChangeStatusListingAuditCondition(index, ListingAuditConditionStructs[index].isActive);
        return true;
    }

    function update(uint256 index, uint256 listingIndex, string conditionText, string compare, uint256 value)
    public
    returns(bool success) {
        if (!isExists(index)) revert();

        ListingAuditConditionStructs[index].conditionText = conditionText;
        ListingAuditConditionStructs[index].compare = compare;
        ListingAuditConditionStructs[index].value = value;

        emit LogUpdateListingAuditCondition(
            ListingAuditConditionStructs[index].index,
            ListingAuditConditionStructs[index].listingIndex,
            ListingAuditConditionStructs[index].conditionText,
            ListingAuditConditionStructs[index].compare,
            ListingAuditConditionStructs[index].value, 
            ListingAuditConditionStructs[index].isActive);

        return true;
    }

    function deleteListingAuditCondition(uint256 deleteIndex) 
    public
    returns(uint256 index){
        if (!(isExists(deleteIndex))) revert();

        //important since deleteIndex <> ListingAuditConditionStructs[deleteIndex].index
        uint256 rowToDeleteIndex = ListingAuditConditionStructs[deleteIndex].index;
        //Get the Last index/key
        uint256 keyToMoveIndex = Index[Index.length - 1];
        //Set the rowToDelete index as Last Index
        Index[rowToDeleteIndex] = keyToMoveIndex;
        //Set the moved struct's index as rowToDelete Index
        ListingAuditConditionStructs[keyToMoveIndex].index = rowToDeleteIndex;
        Index.length--;

        emit LogDeleteListingAuditCondition(rowToDeleteIndex);
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
        uint256 listingIndex,
        string conditionText,
        string compare,
        uint value,
        bool isActive)
    {
        if (!(isExists(getIndex))) revert();

        return ( ListingAuditConditionStructs[getIndex].index,
            ListingAuditConditionStructs[getIndex].listingIndex,
            ListingAuditConditionStructs[getIndex].conditionText, 
            ListingAuditConditionStructs[getIndex].compare,
            ListingAuditConditionStructs[getIndex].value, 
            ListingAuditConditionStructs[getIndex].isActive);
    }

    function getConditionTextAtIndex(uint256 index)
    public
    view
    returns(string conditionText)
    {
        if (!(isExists(index))) revert();

        return ListingAuditConditionStructs[index].conditionText;
    }

    function getCompareAtIndex(uint256 index)
    public
    view
    returns(string compare)
    {
        if (!(isExists(index))) revert();

        return ListingAuditConditionStructs[index].compare;
    }

    function getValueAtIndex(uint256 index)
    public
    view
    returns(uint256 value)
    {
        if (!(isExists(index))) revert();

        return ListingAuditConditionStructs[index].value;
    }

    function getListingIndexAtIndex(uint256 index)
    public
    view
    returns(uint256 listingIndex)
    {
        if (!(isExists(index))) revert();

        return ListingAuditConditionStructs[index].listingIndex;
    }

    function getStatusAtIndex(uint256 index)
    public
    view
    returns(bool isActive)
    {
        if (!(isExists(index))) revert();
        
        return ListingAuditConditionStructs[index].isActive;
    }
}