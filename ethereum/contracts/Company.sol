pragma solidity ^0.4.18;

contract Company {
    
    struct SupportAgent
    {
	string	email;
        string	fName;
        string	lName;
	string	timeZone;
	uint	agentIndex;	
    }
    
    mapping (address => SupportAgent) supportAgents;
    address[] public supportAgentRecords;
    mapping (address => bool) public isSupportAgent;

//////////////////////////////////////////////////////////////////////////////////////////////////////
    modifier agentDoesNotExist(address supportagent) {
        require(!isSupportAgent[supportagent]);
        _;
    }

    modifier agentExist(address supportagent) {
        require(isSupportAgent[supportagent]);
        _;
    }

    modifier notNull(address _address) {
        require(_address != 0);
        _;
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function addSupportAgent(address _address, string _email, string _fName, string _lName, string _timeZone) public 
    {
        SupportAgent memory supportAgent = supportAgents[_address];
        
        supportAgent.email	 = _email;
        supportAgent.fName	 = _fName;
        supportAgent.lName	 = _lName;
	supportAgent.timeZone	 = _timeZone;
	supportAgent.agentIndex =  supportAgentRecords.length;  // Row ID (Array Index) of an Agent
        
        supportAgentRecords.push(_address) -1;

	isSupportAgent[_address] = true;
    }

    function removeOneSupportAgent(address _address) public returns (uint)
    {
	/*
		Swap the last agent to position of the to-be remove agent position
	*/

	uint removeThisAgent = findSupportAgentArrayIndex(_address); // Get the Array Index

	supportAgentRecords[removeThisAgent] = supportAgentRecords[supportAgentRecords.length - 1];

	delete supportAgentRecords[supportAgentRecords.length - 1]; 

	supportAgentRecords.length--;

	isSupportAgent[_address] = false;

	return countSupportAgents();
    }

    function removeAllSupportAgent() public returns (uint)
    {
	for (uint i = 0; i < supportAgentRecords.length - 1; i++) 
	{
	
	  address _address = findSupportAgentAddressById(i);
          isSupportAgent[_address] = false;

	  delete supportAgentRecords[i];
	  supportAgentRecords.length--;
	}
	return countSupportAgents();
    }
    
    function findAllSupportAgents() view public returns(address[]) {
        return supportAgentRecords;
    }

    function findSupportAgentAddressById(uint index) view public returns (address)
    {
	return (supportAgentRecords[index]);	
    }

    function findSupportAgentArrayIndex(address _address) view public returns (uint) 
    {
        return (supportAgents[_address].agentIndex);
    }
    
	
    function findSupportAgentByAddress(address _address) view public returns (string, string, string,string) 
    {
        return (supportAgents[_address].email, supportAgents[_address].fName, supportAgents[_address].lName,supportAgents[_address].timeZone);
    }
    
    function countSupportAgents() view public returns (uint) {
        return supportAgentRecords.length;
    }
}