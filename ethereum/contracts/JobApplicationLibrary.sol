pragma solidity 0.4.24;

// /// @title JobApplicantLibrary
// /// @dev An collection of helper tools for a JobApplicant

import "./JobApplicant.sol";
import "./Listing.sol";

library JobApplicationLibrary {

    function newApplicant(Listing listing, address _applicant)
    public
    returns (JobApplicant applicant)
    {
        applicant = new JobApplicant(listing, _applicant);
    }

}
