import React , {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react'
import JobApplicant from '../ethereum/jobapplicant';
import web3 from '../ethereum/web3';
import {Link, Router} from '../routes';

class CallForInterviewForm extends Component{
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmitCallForInterview = async event => {
        event.preventDefault();
        console.log(this.props);
        const jobApplicant = JobApplicant(this.props.jobApplicationAddress);
          
        this.setState({ loading: true, errorMessage: '' });
        try {
            
            const accounts = await web3.eth.getAccounts();
  
            await jobApplicant.methods.callForInterview()
            .send({from:accounts[0]});
  
            Router.replaceRoute(`/listings/jobapplicants/${this.props.jobApplicationAddress}`);
        }
        catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading:false});
    }

    render(){
        return (
            <Form onSubmit={this.onSubmitCallForInterview} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Call For Interview
                </Button>
            </Form>

        );
    }

}

export default CallForInterviewForm;