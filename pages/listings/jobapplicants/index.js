import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import {Link} from '../../../routes'; 

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
                    
                     <Link route={`/listings/jobapplicants/${a}`}>
                     <a>View Job Applicant</a>
                   </Link>
                   </div>
                )
            }
        });

        return <Card.Group items={jobApplicantCards}></Card.Group>
    }

    render() {
        return(
                 <div>{this.renderJobApplicants()}</div>
        );
    }
}

export default JobApplicantIndex;