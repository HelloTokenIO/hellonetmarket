import React, {Component} from 'react'
import { Icon, Image, Statistic,Segment } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import {Link} from '../../routes'; 

class AgentDashboard extends Component{
    render(){
        return(
            <Layout>
            <h3>Agent Dashboard</h3>
    <Segment inverted>
    <Statistic.Group widths='two' size='small'>

    <Statistic color='red' inverted>
      <Statistic.Value ><Icon name='money' />10,000</Statistic.Value>
      <Statistic.Label>HelloToken(s)in Staking</Statistic.Label>
    </Statistic>

    <Statistic color='orange' inverted>
      <Statistic.Value>
        <Icon name='chat' />343</Statistic.Value>
      <Statistic.Label>Completed Chats</Statistic.Label>
    </Statistic>

    <Statistic color='yellow' inverted>
      <Statistic.Value>
      <Icon name='building' />
        4
      </Statistic.Value>
      <Statistic.Label>Current Employers</Statistic.Label>
    </Statistic>

    <Statistic color='green' inverted>
      <Statistic.Value>5</Statistic.Value>
      <Statistic.Label>Job Applications</Statistic.Label>
    </Statistic>

    <Statistic color='green' inverted>
      <Statistic.Value>ACTIVE</Statistic.Value>
      <Statistic.Label>Member Status</Statistic.Label>
    </Statistic>

    <Statistic color='purple' inverted>
      <Statistic.Value>3 days</Statistic.Value>
      <Statistic.Label>Since Last Login</Statistic.Label>
    </Statistic>
  </Statistic.Group>
  </Segment>
  </Layout>
        );
    }

}

export default AgentDashboard;