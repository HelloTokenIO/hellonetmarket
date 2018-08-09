pragma solidity 0.4.24;

/// @title Job Listing
/// @dev Used to keep marketplace of job listings from the companies
/// @author Waheed Rahuman waheed@hellotoken.io

import "./Listing.sol";

contract ListingsRegistry {

  /*
   * Events
   */

    event NewListing(uint _index);

  /*
   * Storage
   */

  // Contract owner
    address public owner;

  // Array of all listings
    Listing[] public listings;

  /*
   * Public functions
   */

    constructor()
      public
    {
      // Defines HelloToken admin address 
        owner = msg.sender;
    }

  /// @dev listingsLength(): Return number of listings
    function listingsLength()
      public
      constant
      returns (uint)
    {
        return listings.length;
    }
    
    function getListings() public view returns (Listing[]){
        return listings;
    }

    /// @dev getListing(): Return listing info for a given listing
    /// @param _index the index of the listing we want info about
    function getListing(uint _index)
      public
      constant
      returns (Listing, address, bytes32, uint, uint,uint, uint)
    {
      // Test in truffle deelop:
      // ListingsRegistry.deployed().then(function(instance){ return instance.getListing.call(0) })

      // TODO (Stan): Determine if less gas to do one array lookup into var, and
      // return var struct parts
        return (
          listings[_index],
          listings[_index].owner(),
          listings[_index].ipfsHash(),
          listings[_index].workingHours(),
          listings[_index].resourceType(),
          listings[_index].resourceRate(),
          listings[_index].totalResourceRequired()
        );
    }

    function fetchPage(uint256 cursor, uint256 howMany)
    public
    view
    returns (Listing[] values)
    {
        uint256 length = howMany;
        if (length > listings.length - cursor) {
            length = listings.length - cursor;
        }

        values = new Listing[](length);
        for (uint256 i = 0; i < length; i++) {
            values[i] = listings[cursor + i];
        }

        return values;
    }

    /// Sample Remix invocation:
    /// ["0x01","0x7d","0xfd","0x85","0xd4","0xf6","0xcb","0x4d","0xcd","0x71","0x5a","0x88","0x10","0x1f","0x7b","0x1f","0x06","0xcd","0x1e","0x00","0x9b","0x23","0x27","0xa0","0x80","0x9d","0x01","0xeb","0x9c","0x91","0xf2","0x31"],"3140000000000000000",42

  /*
  *	@dev create(); Create a new job requirements
  *	Data Storage
  *	------------
  *	_ipfsHash		Hash	Hash of data on ipfsHash
  *	_workingHours		unint	No of working hours required
  *	_resourceType		unint	Resource type Agent or Auditor
  *	_resourceRate		unint	Rate offered per hour in wei
  *	_totalResourceRequired	Number	No of agents/auditors required
  */

    function create(
        bytes32 _ipfsHash,
        uint _workingHours,
        uint _resourceType,
        uint _resourceRate,
        uint _totalResourceRequired
    )
      public
      returns (uint)
    {
        listings.push(new Listing(msg.sender, _ipfsHash, _workingHours, _resourceType,_resourceRate,_totalResourceRequired));
        emit NewListing(listings.length-1);
        return listings.length;
    }


  /*
  *	@dev createOnBehalf(); Migrate job posting as admin
  *	Data Storage
  *	------------
  *	_ipfsHash		Hash	Hash of data on ipfsHash
  *	_workingHours		unint	No of working hours required
  *	_resourceType		unint	Resource type Agent or Auditor
  *	_resourceRate		unint	Rate offered per hour in wei
  *	_totalResourceRequired	Number	No of agents/auditors required
  *	_creatorAddress		Address	Adding listing on behalf of someone (Only by admin)
  */

    function createOnBehalf(
        bytes32 _ipfsHash,
        uint _workingHours,
        uint _resourceType,
        uint _resourceRate,
        uint _totalResourceRequired,
        address _creatorAddress
    )
      public
      returns (uint)
    {
        require (msg.sender == owner, "Only callable by registry owner");
        listings.push(new Listing(_creatorAddress,  _ipfsHash, _workingHours, _resourceType,_resourceRate,_totalResourceRequired));
        emit NewListing(listings.length-1);
        return listings.length;
    }
}