pragma solidity ^ 0.4 .24;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Company.sol";

contract TestCompany {
    
    Company company = Company(DeployedAddresses.Company());

    function addAgent () public {
        company.addSupportAgent(0x273863Af361B3F60a071c51a402374081Fa4A4f0,
        'waheed@gmail.com', 'Waheed', 'Rahuman', 'GMT+4');
    }

    function testaddSupportAgent() public {
        addAgent();
        uint256 agents = company.countSupportAgents();
        Assert.equal(agents, 1, "Agents are equal");
    }

    function testgetAgentEmail() public {
        string memory  email = company.getAgentEmail(0x273863Af361B3F60a071c51a402374081Fa4A4f0);
        Assert.equal(email, "waheed@gmail.com", "Email is correctly fetched");
    }

    function testdeleteAll() public {
        
    
        company.addSupportAgent(0x41d5233f434d98b73f22ce664d48be06f4eb073f,
        'waheed@gmail.com', 'Waheed', 'Rahuman', 'GMT+4');        
        
        uint256 agents = company.countSupportAgents();
        Assert.equal(agents, 2,"Total two agents now");

        company.removeAllSupportAgent();
        agents = company.countSupportAgents();
        Assert.equal(agents, 0,"all Agents deleted");
    }

    function testdeleteSupportAgent() public {
        addAgent();
        company.removeOneSupportAgent(0x273863Af361B3F60a071c51a402374081Fa4A4f0);
        uint256 agents = company.countSupportAgents();
        Assert.equal(agents, 0, "Zero Agents");
    }
    
}