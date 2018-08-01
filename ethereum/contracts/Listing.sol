pragma solidity 0.4.24;

/// @title Listing
/// @dev To an individual Job Listing, an job applicant can apply and employ can hire

import "./JobApplicant.sol";
import "./JobApplicationLibrary.sol";


contract Listing {

  /*
   * Events
   */

    event ListingApplied(JobApplicant _jobApplicantContract);
    event ListingChange();

/*
*	Data Storage
*	------------
*	WorkingHours
*	ResourceType
*	resourceRate
*	totalResourceRequired
*/

    address public owner;
    address public ListingRegistry; // TODO: Define interface for real ListingRegistry ?

    // Assume IPFS defaults for hash: function:0x12=sha2, size:0x20=256 bits
    // See: https://ethereum.stackexchange.com/a/17112/20332
    // This assumption may have to change in future, but saves space now

    bytes32 public ipfsHash;
    uint public workingHours;
    uint public resourceType;
    uint public resourceRate;
    uint public totalResourceRequired;
    uint public created;
    uint public expiration;

    // Hire[] public hiring;
    JobApplicant[] public applicants;

    constructor (
      address _owner,
      bytes32 _ipfsHash,
      uint _resourceRate,
      uint _totalResourceRequired,
      uint _resourceType,
      uint _workingHours
    )

////////////////////////////////////////////////////////////////////////////////////////////////////////
//			Data Structure
////////////////////////////////////////////////////////////////////////////////////////////////////////

    public
    {
        owner			= _owner;
        ListingRegistry		= msg.sender; // ListingRegistry(msg.sender);
        ipfsHash			= _ipfsHash;
        resourceRate		= _resourceRate;
        totalResourceRequired	= _totalResourceRequired;
        resourceType		= _resourceType;
        workingHours		= _workingHours;
        created			= now;
        expiration		= created + 14 days;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////
//			Check whether, modifer is the contract owner of the listing
////////////////////////////////////////////////////////////////////////////////////////////////////////

    modifier isEmployer() {
        require(msg.sender == owner);
        _;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////
//			Listing Data
////////////////////////////////////////////////////////////////////////////////////////////////////////
    function data()
    public
    view
    returns (address _owner, bytes32 _ipfsHash, uint _resourceRate, uint _totalResourceRequired, uint _resourceType,uint _workingHours,uint _created, uint _expiration)
    {
        return (owner, ipfsHash, resourceRate, totalResourceRequired, resourceType, workingHours, created, expiration);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// @dev ApplyToJob()		--> An applicant can apply for a Job Listing
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function applyToJob()
    public    
    {

    // Ensure that we are not past the expiration
        require(now < expiration);

        // Create Job Application contract
        JobApplicant applicant = JobApplicationLibrary.newApplicant(this, msg.sender);

        applicants.push(applicant);

        // TODO STAN: How to call function *AND* transfer value??
        // applicant.pay.value(msg.value)();

        emit ListingApplied(applicant);
        emit ListingChange();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////
///	@dev totalJobApplicants(): Return number of applicants for a given Job Listing
////////////////////////////////////////////////////////////////////////////////////////////////////////
    function totalJobApplicants()
      public
      constant
      returns (uint)
    {
        return applicants.length;
    }

    /// @dev getApplicant(): Return Job Application info for a given Job Listing
    /// @param _index the index of the Listing we want info about
    function getApplicant(uint _index)
      public
      constant
      returns (JobApplicant)
    {
        return (
          applicants[_index]
        );
    }

    function getApplicants()
      public
      constant
      returns (JobApplicant[])
    {
        return (
          applicants
        );
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////
///			Hiring Contract Starts							      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

//   function hireApplicant(uint _agentApply)
//     public
//     payable
//   {
//     // Ensure that this is not trying to hire more than required agents
// //    require(_agentApply <= totalResourceRequired);

//     // Ensure that we are not past the expiration
//     require(now < expiration);

//     // Create Job Application contract
//     JobApplicant applicant = JobApplicationLibrary.newApplicant(this, msg.sender);

//     // Count units as sold
//     //totalResourceRequired -= _agentApply;

//     applicants.push(applicant);

//     // TODO STAN: How to call function *AND* transfer value??
//     // applicant.pay.value(msg.value)();

//     emit ListingApplied(applicant);
//     emit ListingChange();
//   }

////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// @dev close(): Allows an employer to close the Job Listing from further applicants
////////////////////////////////////////////////////////////////////////////////////////////////////////
    function close()
        public
        isEmployer
    {
        totalResourceRequired = 0;
        emit ListingChange();
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////

}




