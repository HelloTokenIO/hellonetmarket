pragma solidity 0.4.24;

// /// @title JobApplicant
// /// @dev An Application to a Job Listing and its status
import "./Listing.sol";


contract JobApplicant 
{

  /*
  * Events
  */

    event JobApplicationChange(Stages stage);
    event JobApplicationReview(address reviewer, address reviewee, Roles revieweeRole, uint8 rating, bytes32 ipfsHash);

    /*
    * Enum
    */

    enum Stages {

      // Applicant Status
      AWAITING_INTERVIEW,			// Applicant applied for interview and waiting for the interview
      AWAITING_JOBOFFER,			// Applicant attended the interview and waiting for the job offer
      CANCEL_APPLICATION,			// Applicant cancelled the job application, after applying for the job

      // Employer Status
      INTERVIEW_PENDING,			// Employer reviewed the application and send interview call and waiting for interview acceptance
      JOBOFFER_PENDING,			// Employer finished interview and sent job offer and waiting for acceptance from the applicant
      APPLICATION_REJECTED,		// Applicant not eligible for the job

      EMPLOYEMENT_PERIOD,			// Both Employer and Applicant agreed and Job in progress

      IN_DISPUTE,				// We are in a dispute between employer and employee on payments    
      EMPLOYEMENT_TERMINATION		// End of Job Contract

    }

    enum Roles {
      APPLICANT,
      EMPLOYER
    }

    /*
    * Storage
    */

    Stages private internalStage = Stages.AWAITING_INTERVIEW;
    Listing public listingContract; // listing that is being purchased
    address public applicant; // User who is buying. Seller is derived from listing
    uint public created;
    uint public applicationTimeout;

    /*
    * Modifiers
    */

    modifier isEmployer() {
        require(msg.sender == listingContract.owner());
        _;
    }

    modifier isApplicant() {
        require(msg.sender == applicant);
        _;
    }

    modifier atStage(Stages _stage) {
        require(stage() == _stage);
        _;
    }

    /*
    * Public functions
    */

    constructor (
      address _listingContractAddress,
      address _applicant
    )
    public
    {
        applicant = _applicant;
        listingContract = Listing(_listingContractAddress);
        created = now;
        emit JobApplicationChange(internalStage);
    }

    function data()
    public
    view
    returns (Stages _stage, Listing _listingContract, address _applicant, uint _created, uint _applicantTimout) {
        return (stage(), listingContract, applicant, created, _applicantTimout);
    }
    

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Applicant cancels the job application
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function cancelApplication()
    public
    {
        // This should be called only by the job listing owner
        require(
            msg.sender == applicant
        );
        

        // Must be in a valid stage
        require(
            stage() == Stages.AWAITING_INTERVIEW ||
            stage() == Stages.AWAITING_JOBOFFER
        );


        internalStage = Stages.CANCEL_APPLICATION;
        emit JobApplicationChange(internalStage);

    }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Call the Applicant for an interview
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function callForInterview()
    public
    {
        // This should be called only by the job listing owner
        require(
            msg.sender == listingContract.owner()
        );


        // Must be in a valid stage
        require(
            stage() == Stages.AWAITING_INTERVIEW
        );

        internalStage = Stages.INTERVIEW_PENDING;
        emit JobApplicationChange(internalStage);

    }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //		This function returns the current status of the application
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function stage()
    public
    view
    returns (Stages _stage)
    {
        return internalStage;
    }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Terminate the Job Contract any time
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function terminateEmployment()
    public
    {
      // Must be employee 
        require(
            msg.sender == listingContract.owner()
        );

      // Must be in a valid stage
        require(
            stage() == Stages.EMPLOYEMENT_PERIOD
        );

        internalStage = Stages.EMPLOYEMENT_TERMINATION;
        emit JobApplicationChange(internalStage);

      // TODO: Create a dispute contract?
      // Right now there's no way to exit this state.
    }  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Problem between employer and employee either open a dispute
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function openDispute()
    public
    {
      // Must be employee or employer
        require(
            msg.sender == applicant ||
            msg.sender == listingContract.owner()
        );

        // Must be in a valid stage
        require(
            stage() == Stages.EMPLOYEMENT_PERIOD
        );

        internalStage = Stages.IN_DISPUTE;
        emit JobApplicationChange(internalStage);

      // TODO: Create a dispute contract?
      // Right now there's no way to exit this state.
    }  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////  
}