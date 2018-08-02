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
      INTERVIEW_NOT_SELECTED,       //Applicant Unsuccessful/Failed the Interview
      JOBOFFER_ACCEPTED,            //Applicant Accepts the Job Offer
      JOBOFFER_NOT_ACCEPTED,            //Applicant Rejects the Job Offer


      // Employer Status
      INTERVIEW_PENDING,			// Employer reviewed the application and send interview call and waiting for interview acceptance
      JOBOFFER_PENDING,			// Employer finished interview and sent job offer and waiting for acceptance from the applicant
      APPLICATION_REJECTED,		// Applicant not eligible for the job

      EMPLOYMENT_PERIOD,			// Both Employer and Applicant agreed and Job in progress

      IN_DISPUTE,				    // We are in a dispute between employer and employee on payments    
      EMPLOYMENT_TERMINATION		// End of Job Contract

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

    modifier isEmployerOrApplicant() {
        require(
            msg.sender == applicant ||
            msg.sender == listingContract.owner()
        );
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
  //	Applicant cancels the job application
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function cancelApplication()
    public
    isApplicant
    {
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
    isEmployer
    atStage(Stages.AWAITING_INTERVIEW)
    {
        internalStage = Stages.INTERVIEW_PENDING;
        emit JobApplicationChange(internalStage);
    }

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Reject an Application
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function rejectApplication()
    public
    isEmployer
    atStage(Stages.AWAITING_INTERVIEW)
    {
        internalStage = Stages.APPLICATION_REJECTED;
        emit JobApplicationChange(internalStage);
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Passed the Interview
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function interviewSuccessful()
    public
    isEmployer
    atStage(Stages.INTERVIEW_PENDING)
    {
        internalStage = Stages.AWAITING_JOBOFFER;
        emit JobApplicationChange(internalStage);
    }
 
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Not Selected in the Interview
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function interviewNotSelected()
    public
    isEmployer
    atStage(Stages.INTERVIEW_PENDING)
    {
        internalStage = Stages.INTERVIEW_NOT_SELECTED;
        emit JobApplicationChange(internalStage);
    }
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Offer Job
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function offerJob()
    public
    isEmployer
    atStage(Stages.AWAITING_JOBOFFER)
    {
        internalStage = Stages.JOBOFFER_PENDING;
        emit JobApplicationChange(internalStage);
    }
 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Accept the JobOffer
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function acceptJobOffer()
    public
    isApplicant
    atStage(Stages.JOBOFFER_PENDING)
    {
        internalStage = Stages.JOBOFFER_ACCEPTED; //Is this needed or directly go to EMPLOYMENT_PERIOD?
        emit JobApplicationChange(internalStage);
    }
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Reject the JobOffer
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function rejectJobOffer()
    public
    isApplicant
    atStage(Stages.JOBOFFER_PENDING)
    {
        internalStage = Stages.JOBOFFER_NOT_ACCEPTED;
        emit JobApplicationChange(internalStage);
    }
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Start Employment
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function startEmployment()
    public
    isEmployerOrApplicant
    atStage(Stages.JOBOFFER_ACCEPTED)
    {
        internalStage = Stages.EMPLOYMENT_PERIOD; //Is this needed or directly go to EMPLOYMENT_PERIOD?
        emit JobApplicationChange(internalStage);
    }
 

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Terminate the Job Contract any time
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function terminateEmployment()
    public
    isEmployer
    atStage(Stages.EMPLOYMENT_PERIOD)
    {
        internalStage = Stages.EMPLOYMENT_TERMINATION;
        emit JobApplicationChange(internalStage);
    }  

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	Problem between employer and employee either open a dispute
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function openDispute()
    public
    isEmployerOrApplicant
    atStage(Stages.EMPLOYMENT_PERIOD)
    {
        internalStage = Stages.IN_DISPUTE;
        emit JobApplicationChange(internalStage);
    }  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////  
}