import React, {Component} from 'react';
import { Card,Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import Listing from '../../../ethereum/listing';
import JobApplicant from '../../../ethereum/jobapplicant';

class JobApplicantDetails extends Component {
    static async getInitialProps(props){
        const jobApplicant = JobApplicant(props.query.a);
        const details = await jobApplicant.methods.data().call();

        return {
            stage: details[0],
            listingAddress: details[1],
            applicantAddress: details[2]  
        };
    }

    renderCards() {
        const {
          stage,
          listingAddress,
          applicantAddress          
        } = this.props;
    
        const items = [
          {
            header: applicantAddress,
            meta: 'applicantAddress',
            description:
              'The manager created this campaign and can create requests to withdraw money',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: stage,
            meta: 'stage',
            description:
              'You must contribute at least this much wei to become an approver'
          }
        ];
    
        return <Card.Group items={items} />;
      }

    render() {
        return(
        <Layout>
            <h3>Job Applicant Details</h3>
            <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/listings/${this.props.listingAddress}`}>
                <a>
                  <Button primary>Back to Listing</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Layout>
        );
    }
}

export default JobApplicantDetails;