import React , {Component} from 'react';
import { Card, Grid, Button, Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Listing from '../../ethereum/listing';
import {Link, Router} from '../../routes';
import ApplyJobForm from '../../components/ApplyJobForm';
import JobApplicantIndex from '../listings/jobapplicants/index';

class ListingDetails extends Component {
  static async getInitialProps(props) {
      // console.log(props);
      const listingAddress = props.query.c;
    const listing = Listing(props.query.c);
    const summary = await listing.methods.data().call();
    const jobApplicants = await listing.methods.getApplicants().call();

    return {
        listingAddress: listingAddress,
      address: summary[0],
      ipfsHash: summary[1],
      resourceRate: summary[2],
      totalResourceRequired: summary[3],
      resourceType: summary[4],
      workingHours: summary[5],
      jobApplicants: jobApplicants
    };
  }

  renderCards() {
    const {
      address,
      resourceRate,
      workingHours,
      ipfsHash,
      totalResourceRequired,
      resourceType,
      jobApplicants
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
        <h3>Listing Details</h3>
        <Grid>
          {/* <Grid.Row>
            <Grid.Column>
                  <ApplyJobForm listingAddress={this.props.listingAddress} />
              </Grid.Column>
            
          </Grid.Row> */}
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ApplyJobForm listingAddress={this.props.listingAddress} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Divider horizontal/>
          </Grid.Row>
          <Grid.Row>
          <h3>Job Applicants</h3>
          </Grid.Row>
          <Grid.Row>
          <h4>Number of Job Applicants: {this.props.jobApplicants.length}</h4>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <JobApplicantIndex jobApplicants={this.props.jobApplicants} />
            </Grid.Column>
          </Grid.Row>
         
        </Grid>
      </Layout>
    );
  }
}

export default ListingDetails;
