import React, {Component} from 'react'
import { Icon, Image, Statistic,Segment } from 'semantic-ui-react'
import Layout from '../components/Layout';
import {Link} from '../routes'; 

class Home extends Component{
    render(){
        return(
            <Layout>
            <h3> Welcome to HelloNet Marketplace!</h3>
    <Segment inverted>
    <Statistic.Group widths='two' size='small'>

    <Statistic color='red' inverted>
      <Statistic.Value ><Icon name='money' />100,000,000</Statistic.Value>
      <Statistic.Label>HelloToken(s) in Circulation</Statistic.Label>
    </Statistic>
    <Statistic color='red' inverted>
      <Statistic.Value ><Icon name='dollar' />1.45</Statistic.Value>
      <Statistic.Label>= 1 HelloToken</Statistic.Label>
    </Statistic>

    <Statistic color='orange' inverted>
      <Statistic.Value>
        <Icon name='chat' />512,443</Statistic.Value>
      <Statistic.Label>Chats</Statistic.Label>
    </Statistic>

    <Statistic color='yellow' inverted>
      <Statistic.Value>
      <Icon name='building' />
        1,514
      </Statistic.Value>
      <Statistic.Label>Active Companies</Statistic.Label>
    </Statistic>

    <Statistic color='yellow' inverted>
      <Statistic.Value>
        <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
        3,088
      </Statistic.Value>
      <Statistic.Label>Active Agents</Statistic.Label>
    </Statistic>

    <Statistic color='yellow' inverted>
      <Statistic.Value>
        <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
        1,156
      </Statistic.Value>
      <Statistic.Label>Active Auditors</Statistic.Label>
    </Statistic>

    <Statistic color='green' inverted>
      <Statistic.Value><Icon name='list' />14,903</Statistic.Value>
      <Statistic.Label>Active Listings</Statistic.Label>
    </Statistic>
    <Statistic color='green' inverted>
      <Statistic.Value><Icon name='list' />11,752</Statistic.Value>
      <Statistic.Label>Job Applications</Statistic.Label>
    </Statistic>
  </Statistic.Group>
  </Segment>

  </Layout>
        );
    }

}

export default Home;