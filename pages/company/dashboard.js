import React, {Component} from 'react'
import { Icon, Image, Statistic,Segment } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import {Link} from '../../routes'; 

class CompanyDashboard extends Component{
    render(){
        return(
            <Layout>
            <h3>Company Dashboard</h3>
    <Segment inverted>
    <Statistic.Group widths='two' size='small'>

    <Statistic color='red' inverted>
      <Statistic.Value ><Icon name='money' />20,000</Statistic.Value>
      <Statistic.Label>HelloToken(s)in Staking</Statistic.Label>
    </Statistic>

    <Statistic color='orange' inverted>
      <Statistic.Value>
        <Icon name='chat' />5,023</Statistic.Value>
      <Statistic.Label>Chats</Statistic.Label>
    </Statistic>

    <Statistic color='yellow' inverted>
      <Statistic.Value>
        <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
        42
      </Statistic.Value>
      <Statistic.Label>Current Employed Agents</Statistic.Label>
    </Statistic>

    <Statistic color='green' inverted>
      <Statistic.Value>3</Statistic.Value>
      <Statistic.Label>Active Listings</Statistic.Label>
    </Statistic>

    <Statistic color='green' inverted>
      <Statistic.Value>ACTIVE</Statistic.Value>
      <Statistic.Label>Member Status</Statistic.Label>
    </Statistic>

    <Statistic color='purple' inverted>
      <Statistic.Value>2 days</Statistic.Value>
      <Statistic.Label>Since Last Login</Statistic.Label>
    </Statistic>
  </Statistic.Group>
  </Segment>
  </Layout>
        );
    }

}

export default CompanyDashboard;