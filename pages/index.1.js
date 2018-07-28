import React, {Component} from 'react';
import HelloToken from '../ethereum/hellotoken';
import axios from "axios";
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>

class AgentIndex extends Component {
    static async getInitialProps() {
const agents = '<data>1</data>';
        // const agents = await axios
        //     .get("http://localhost:55552/api/agents/available/0xe67471630cffc94df310c24ef0fca660dc5ade02");

        console.log(agents.data);

        return { data: agents.data };
    }

    renderAgents() {
        const agentCards = this.props.data.map(c=> {
            return { 
             header: c.name,
             description: c.tokenAddress
            }
        }

        );

        return <Card.Group items={agentCards} />
    }

    render(){
        return (
        <Layout>
            <div>
                
                <h3>Agent Listing</h3>
                <Button floated="right" content="Create Listing" icon="add circle" primary />
            {this.renderAgents()}
            
            </div>
        </Layout>
        );
    }
} 

export default AgentIndex;

