import React, {Component} from 'react';
import HelloToken from '../ethereum/hellotoken';
import axios from "axios";

class AgentIndex extends Component {
    static async getInitialProps() {

        const agents = await axios
            .get("http://localhost:55552/api/agents/available/0xe67471630cffc94df310c24ef0fca660dc5ade02");

        console.log(agents);

        return {agents};
    }

    render(){
        return <div>{this.props.agents}</div>;
    }
} 

export default AgentIndex;

