pragma solidity ^0.4.18;

contract AuditCriteriaManager {

  struct CriteriaStruct {
    bytes32 criteriaText;
    uint minScore;
    uint maxScore;
    bool isActive;
    uint256 index;
  }
  
  mapping(uint256 => CriteriaStruct) private CriteriaStructs;
  uint256[] private CriteriaIndex;

  event LogNewCriteria   (uint256 indexed CriteriaIndex, uint index, bytes32 CriteriaText, uint maxScore);
  event LogUpdateCriteria(uint256 indexed CriteriaIndex, uint index, bytes32 CriteriaText, uint maxScore);
  event LogDeleteCriteria(uint256 indexed CriteriaIndex, uint index);
  
  function isCriteria(uint indexExist)
    public 
    constant
    returns(bool isIndeed) 
  {
    if(CriteriaIndex.length == 0) return false;
    return (CriteriaIndex[CriteriaStructs[indexExist].index] == indexExist);
  }

  function insertCriteria(
    bytes32 newCriteriaText, 
    uint minScore, 
    uint maxScore,
    bool isActive) 
    public
    returns(uint256 index)
  {
    //if(isCriteria(CriteriaAddress)) revert();
    uint256 currentIndex = getCriteriaCount();

    CriteriaStructs[currentIndex].criteriaText  = newCriteriaText;
    CriteriaStructs[currentIndex].minScore      = minScore;
    CriteriaStructs[currentIndex].maxScore      = maxScore;
    CriteriaStructs[currentIndex].isActive      = isActive;
    CriteriaStructs[currentIndex].index         = CriteriaIndex.push(currentIndex)-1;

    emit LogNewCriteria(
        currentIndex, 
        CriteriaStructs[currentIndex].index, 
        newCriteriaText, 
        maxScore);
    return CriteriaIndex.length-1;
  }

  function deleteCriteria(uint256 deleteCriteriaIndex) 
    public
    returns(uint256 index)
  {
    if(!isCriteria(deleteCriteriaIndex)) revert();

    uint256 rowToDelete = CriteriaStructs[deleteCriteriaIndex].index;
    uint256 keyToMove   = CriteriaIndex[CriteriaIndex.length-1];
    CriteriaIndex[rowToDelete] = keyToMove;
    CriteriaStructs[keyToMove].index = rowToDelete; 
    CriteriaIndex.length--;
    emit LogDeleteCriteria(
        deleteCriteriaIndex, 
        rowToDelete);
    emit LogUpdateCriteria(
        keyToMove, 
        rowToDelete, 
        CriteriaStructs[keyToMove].criteriaText, 
        CriteriaStructs[keyToMove].maxScore);
    return rowToDelete;
  }
  
  function getCriteria(uint256 criteriaIndex)
    public 
    constant
    returns(bytes32 criteriaText, uint maxScore, uint minScore, bool isActive)
  {
    if(!isCriteria(criteriaIndex)) revert();

    return(
      CriteriaStructs[criteriaIndex].criteriaText, 
      CriteriaStructs[criteriaIndex].maxScore, 
      CriteriaStructs[criteriaIndex].minScore,
      CriteriaStructs[criteriaIndex].isActive);
  } 
  
  function updateCriteriaText(uint256 criteriaIndex, bytes32 criteriaText) 
    public
    returns(bool success) 
  {
    if(!isCriteria(criteriaIndex)) revert();

    CriteriaStructs[criteriaIndex].criteriaText = criteriaText;
    emit LogUpdateCriteria(
      criteriaIndex, 
      CriteriaStructs[criteriaIndex].index,
      criteriaText, 
      CriteriaStructs[criteriaIndex].maxScore);
    return true;
  }
  
  function updateMaxMinScore(uint256 index, uint MaxScore, uint MinScore) 
    public
    returns(bool success) 
  {
    if(!isCriteria(index)) revert();

    CriteriaStructs[index].maxScore = MaxScore;
    CriteriaStructs[index].minScore = MinScore;
    emit LogUpdateCriteria(
      index, 
      CriteriaStructs[index].index,
      CriteriaStructs[index].criteriaText,
      CriteriaStructs[index].minScore);
    return true;
  }

  function getCriteriaCount() 
    public
    constant
    returns(uint256 count)
  {
    return CriteriaIndex.length;
  }

  function getCriteriaAtIndex(uint index)
    public
    constant
    returns(uint256 criteriaIndex)
  {
    return CriteriaIndex[index];
  }

}