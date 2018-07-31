import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import Listing from '../../../ethereum/listing';
import JobApplicant from '../../../ethereum/jobapplicant';

class JobApplicantIndex extends Component {

    renderJobApplicants() {
        console.log(this.props);
        console.log(this.props.jobApplicants);

       const jobApplicantCards = this.props.jobApplicants.map(a => {
            return {
                header: a,
                description: (
                    <div>
                        <a>Stage: a</a>
                        <a>Created: a</a>
                    </div>
                )
            }
        });

        return <Card.Group items={jobApplicantCards}></Card.Group>
    }

    render() {
        return(
                <div>
                <h3>Job Applicants</h3>
                <div>{this.renderJobApplicants()}</div>
                </div>
        );
    }
}

export default JobApplicantIndex;