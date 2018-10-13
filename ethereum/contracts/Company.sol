pragma solidity ^ 0.4 .18;

contract Company {

    struct SupportAgent {
        address agentAddress;
        string email;
        string fName;
        string lName;
        string timeZone;
        uint index;
    }

    mapping(uint256 => SupportAgent) private SupportAgents;
    address[] public supportAgentRecords;
    
    mapping(address => uint256) private agentRecords;
    
    uint256[] private agentIndex;
    
    
    mapping(address => bool) public isSupportAgent;

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

    function addSupportAgent(address _address, string _email, string _fName, string _lName, string _timeZone) 
    public
      returns(uint256 index) {
        
        
        // If the first argument of `require` evaluates
        // to `false`, execution terminates and all
        // changes to the state and to Ether balances
        // are reverted.
        // This used to consume all gas in old EVM versions, but
        // not anymore.
        // It is often a good idea to use `require` to check if
        // functions are called correctly.
        // As a second argument, you can also provide an
        // explanation about what went wrong.        
            
        require(
            isSupportAgent[_address] == false,
            "Agent already exist !"
            );            
        
        
        require(
            (bytes(_email).length < 5)==false,
            "Invalid Email address !"
            );
    
        require(
            (bytes(_fName).length < 3)==false,
            "First name should contain minimum 3 letters"
            );        
        
        require(
            (bytes(_lName).length < 3)==false,
            "Last name should contain minimum 3 letters"
            );                
            
        require(
            (bytes(_timeZone).length < 3)==false,
            "Timezone is Invalid"
            );      
            
        uint256 currentIndex = countSupportAgents();
        isSupportAgent[_address] = true;
        
        SupportAgents[currentIndex].agentAddress = _address;
        SupportAgents[currentIndex].email        = _email;
        SupportAgents[currentIndex].fName        = _fName;
        SupportAgents[currentIndex].lName        = _lName;        
        SupportAgents[currentIndex].timeZone     = _timeZone;

        SupportAgents[currentIndex].index = agentIndex.push(currentIndex) - 1;
        
        agentRecords[_address] = currentIndex;
        
        return agentIndex.length-1;
    }

    function removeOneSupportAgent(address _address) public returns(uint) {
        
        require(
            isSupportAgent[_address] == true,
            "There is no such agent with the given address !"
            );            
        

         uint256 index = agentRecords[_address];    
                
         delete isSupportAgent[_address];
         delete agentRecords[_address];
         
         delete SupportAgents[index];
         delete agentIndex[index];
         
         agentIndex.length--;
        
        return countSupportAgents();
    }

    function removeAllSupportAgent() public returns(uint) {

        for (uint i=0; i < agentIndex.length; i++) 
        {
         address agentAddress = SupportAgents[i].agentAddress;    
         
         delete isSupportAgent[agentAddress];
         delete agentRecords[agentAddress];
         delete SupportAgents[i];
         
        }
        delete agentIndex;        
        return countSupportAgents();
    }
    

    function findAllSupportAgents() view public returns(address[]) {
        return supportAgentRecords;
    }

    function findSupportAgentAddressById(uint index) view public returns(address) {
        return (SupportAgents[index].agentAddress);
    }

    function findSupportAgentArrayIndex(address _address) view public returns(uint) {

        require(
            isSupportAgent[_address] == true,
            "There is no such agent with the given address !"
            );            

        return agentRecords[_address];

    }

    
    function getAgentEmail(address _address) view public returns(string) 
    {
        require(
            isSupportAgent[_address] == true,
            "There is no such agent with the given address !"
            );          
        
        uint256 index = agentRecords[_address];    
        
        return (SupportAgents[index].email);
    }
    
    
   function findSupportAgentByAddress(address _address) view public returns(string, string, string, string) 
    {
        require(
            isSupportAgent[_address] == true,
            "There is no such agent with the given address !"
            );          
            
        uint256 index = agentRecords[_address];    
            
        return 
        (SupportAgents[index].email, 
        SupportAgents[index].fName, 
        SupportAgents[index].lName,
        SupportAgents[index].timeZone);
    }
      
    
    function countSupportAgents() view public returns(uint256) {
        return agentIndex.length;
    }
    
}