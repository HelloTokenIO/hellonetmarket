import React, {Component} from 'react';
import HelloToken from '../ethereum/hellotoken';
import ListingsRegistry from '../ethereum/listingsregistry';
import axios from "axios";
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

class AgentIndex extends Component {
    static async getInitialProps() {
        const listings = await ListingsRegistry.methods.getListings().call();

        console.log(listings);

        return {listings};
    }


    renderAgents() {
        const agentCards = this.props.data.map(c=> {
            return { 
             header: c.address,
             description: c.address
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



