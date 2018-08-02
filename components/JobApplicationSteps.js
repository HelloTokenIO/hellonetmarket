import React, {Component} from 'react'
import { Step } from 'semantic-ui-react'

class JobApplicationSteps extends Component {
    render() {
        return(
  <Step.Group ordered>
    <Step completed>
      <Step.Content>
        <Step.Title>Applied</Step.Title>
        {/* <Step.Description>Applicant applied for interview and waiting for the interview</Step.Description> */}
      </Step.Content>
    </Step>

    <Step completed>
      <Step.Content>
        <Step.Title>Interview</Step.Title>
        {/* <Step.Description>Applicant applied for interview and waiting for the interview</Step.Description> */}
      </Step.Content>
    </Step>

    <Step active>
      <Step.Content>
        <Step.Title>Job Offer</Step.Title>
        {/* <Step.Description>Applicant attended the interview and waiting for the job offer</Step.Description> */}
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
        <Step.Title>Employment</Step.Title>
        {/* <Step.Description>Applicant cancelled the job application, after applying for the job</Step.Description> */}
      </Step.Content>
    </Step>
  </Step.Group>
);
}
}

export default JobApplicationSteps