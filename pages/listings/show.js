import React , {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Listing from '../../ethereum/listing';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes';

class ListingShow extends Component {
  static async getInitialProps(props) {
      console.log(props);
    const listing = Listing(props.query.c);
    console.log('summary==========================');
    console.log(summary);
    const summary = await listing.methods.data().call();

    return {
      address: summary[0],
      ipfsHash: summary[1],
      resourceRate: summary[2],
      totalResourceRequired: summary[3],
      resourceType: summary[4],
      workingHours: summary[5]
    };
  }

  renderCards() {
    const {
      resourceRate,
      workingHours,
      ipfsHash,
      totalResourceRequired,
      resourceType
    } = this.props;

    const items = [
      {
        header: workingHours,
        meta: 'workingHours',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: ipfsHash,
        meta: 'ipfsHash',
        description:
          'You must contribute at least this much wei to become an approver'
      },
      {
        header: totalResourceRequired,
        meta: 'totalResourceRequired',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: resourceType,
        meta: 'resourceType',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: resourceRate,
        meta: 'resourceRate',
        description:
          'The balance is how much money this campaign has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>listing Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              {/* <ContributeForm address={this.props.address} /> */}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/listings/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ListingShow;
