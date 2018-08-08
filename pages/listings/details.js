import React , {Component} from 'react';
import { Card, Grid, Button, Divider, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Listing from '../../ethereum/listing';
import {Link, Router} from '../../routes';
import ApplyJobForm from '../../components/ApplyJobForm';
import JobApplicantIndex from '../listings/jobapplicants/index';
import ipfs, { ipfsFileUrlPrefix, ipfsGetData } from '../../ipfs/ipfs';
import ipfsUtils from '../../ipfs/ipfsUtils';

class ListingDetails extends Component {
  static async getInitialProps(props) {
      // console.log(props);
    const listingAddress = props.query.c;
    const listing = Listing(props.query.c);
    const summary = await listing.methods.data().call();
    const jobApplicants = await listing.methods.getApplicants().call();

    const ipfsHash = ipfsUtils.getIpfsHashFromBytes32(summary[1]);

    const ipfsContent = await ipfsGetData(ipfsHash);
    const ipfsObject = JSON.parse(ipfsContent);
    
    return {
        listingAddress: listingAddress,
      address: summary[0],
      ipfsHash: ipfsHash,
      resourceRate: summary[4],
      totalResourceRequired: summary[5],
      resourceType: 1,
      workingHours: summary[2],
      jobApplicants: jobApplicants,
      ipfsContent: ipfsContent,
      name: ipfsObject.name,
      description: ipfsObject.description,
      ipfsFileUrl: 'https://ipfs.io/ipfs/' + ipfsHash
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
      jobApplicants,
      name,
      description,
      ipfsFileUrl
    } = this.props;

    const items = [
      {
        header: name,
        meta: 'Name',
        description:
          'Name of the Listing',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: description,
        meta: 'Description',
        description: 'Description of the Listing',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: workingHours,
        meta: 'Working Hours',
        description:
          'The Number of Hours the Resource is expected to work per day',
        style: { overflowWrap: 'break-word' }
      },
    
      {
        header: totalResourceRequired,
        meta: 'Total Resource Required',
        description:
          'Total Number of Resources Needed'
      },
      {
        header: resourceType,
        meta: 'resourceType',
        description:
          'Type of Resource Needed'
      },
      {
        header: resourceRate,
        meta: 'HelloToken(s) Per Hour',
        description:
          'Number of HelloToken(s) paid per hour'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Listing Details</h3>
        <Grid>
       
           <Grid.Row>
            <Grid.Column width={5}>
              <Link route={`${this.props.ipfsFileUrl}`}>
                <a>
                  <Button secondary ><Icon name='file' size='large' link></Icon>View On IPFS</Button>
                </a>
              </Link>
            </Grid.Column>

            <Grid.Column width={5}>
                <ApplyJobForm listingAddress={this.props.listingAddress} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={15}>{this.renderCards()}</Grid.Column>
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
