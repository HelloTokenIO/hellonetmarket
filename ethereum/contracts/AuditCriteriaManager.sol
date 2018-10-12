pragma solidity ^ 0.4 .18;

contract AuditCriteriaManager {

  struct CriteriaStruct {
    string criteriaText;
    uint minScore;
    uint maxScore;
    bool isActive;
    uint256 index;
  }

  mapping(uint256 => CriteriaStruct) private CriteriaStructs;
  uint256[] private CriteriaIndex;

  event LogNewCriteria(uint256 indexed CriteriaIndex, uint index, string CriteriaText, uint maxScore);
  event LogUpdateCriteria(uint256 indexed CriteriaIndex, uint index, string CriteriaText, uint maxScore);
  event LogDeleteCriteria(uint256 indexed CriteriaIndex, uint index);
  event LogCriteriaStatusChange(uint256 indexed CriteriaIndex, bool criteriaStatus);

  function isCriteria(uint indexExist)
  public
  constant
  returns(bool isIndeed) {
    if (CriteriaIndex.length == 0) return false;
    return (CriteriaIndex[CriteriaStructs[indexExist].index] == indexExist);
  }

  function insertCriteria(
    string newCriteriaText,
    uint minScore,
    uint maxScore,
    bool isActive)
  public
  returns(uint256 index) {
    uint256 currentIndex = getCriteriaCount();
    CriteriaStructs[currentIndex].criteriaText = newCriteriaText;
    CriteriaStructs[currentIndex].minScore = minScore;
    CriteriaStructs[currentIndex].maxScore = maxScore;
    CriteriaStructs[currentIndex].isActive = isActive;
    CriteriaStructs[currentIndex].index = CriteriaIndex.push(currentIndex) - 1;

    emit LogNewCriteria(
      currentIndex,
      CriteriaStructs[currentIndex].index,
      newCriteriaText,
      maxScore);
    return CriteriaIndex.length - 1;
  }

  function deleteAllCriteria() public
  {
    delete CriteriaIndex;
  }

  function deleteCriteria(uint256 deleteCriteriaIndex)
  public
  returns(uint256 index) {
    if (!isCriteria(deleteCriteriaIndex)) revert();

    uint256 rowToDelete = CriteriaStructs[deleteCriteriaIndex].index;
    uint256 keyToMove   = CriteriaIndex[CriteriaIndex.length - 1];
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
  returns(string criteriaText, uint maxScore, uint minScore, bool isActive) {
    if (!isCriteria(criteriaIndex)) revert();

    return (
      CriteriaStructs[criteriaIndex].criteriaText,
      CriteriaStructs[criteriaIndex].maxScore,
      CriteriaStructs[criteriaIndex].minScore,
      CriteriaStructs[criteriaIndex].isActive);
  }


  function getCriteriaText(uint256 criteriaIndex)
  public
  constant
  returns(string criteriaText) {
    if (!isCriteria(criteriaIndex)) revert();

    return (
      CriteriaStructs[criteriaIndex].criteriaText);
  }

  function getMaxScore(uint256 criteriaIndex)
  public
  constant
  returns(uint maxScore) {
    if (!isCriteria(criteriaIndex)) revert();

    return (CriteriaStructs[criteriaIndex].maxScore);
  }

  function getMinScore(uint256 criteriaIndex)
  public
  constant
  returns(uint minScore) {
    if (!isCriteria(criteriaIndex)) revert();

    return (CriteriaStructs[criteriaIndex].minScore);
  }

  function getStatus(uint256 criteriaIndex)
  public
  constant
  returns(bool isActive) {
    if (!isCriteria(criteriaIndex)) revert();

    return (CriteriaStructs[criteriaIndex].isActive);
  }  

  function updateCriteriaText(uint256 criteriaIndex, string criteriaText)
  public
  returns(bool success) {
    if (!isCriteria(criteriaIndex)) revert();

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
  returns(bool success) {
    if (!isCriteria(index)) revert();

    CriteriaStructs[index].maxScore = MaxScore;
    CriteriaStructs[index].minScore = MinScore;
    emit LogUpdateCriteria(
      index,
      CriteriaStructs[index].index,
      CriteriaStructs[index].criteriaText,
      CriteriaStructs[index].minScore);
    return true;
  }

  function changeStatus(uint256 index, bool status)
  public
  returns(bool success) {
    if (!isCriteria(index)) revert();

    CriteriaStructs[index].isActive = status;

    emit LogCriteriaStatusChange(
      index, CriteriaStructs[index].isActive);
    return true;
  }


  function getCriteriaCount()
  public
  constant
  returns(uint256 count) {
    return CriteriaIndex.length;
  }

  function getCriteriaAtIndex(uint index)
  public
  constant
  returns(uint256 criteriaIndex) {
    return CriteriaIndex[index];
  }

}