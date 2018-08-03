import React , {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react'
import JobApplicant from '../ethereum/jobapplicant';
import web3 from '../ethereum/web3';
import {Link, Router} from '../routes';

class JobApplicationStageForm extends Component{
    state = {
        value: '',
        currentStage:'',
        nextStage:'',
        errorMessage: '',
        loading: false
    };

    onSubmitCallForInterview = async event => {
        event.preventDefault();
        this.callMethod('callForInterview');
    }

    onSubmitCancelApplication = async event => {
        event.preventDefault();
        this.callMethod('cancelApplication');
    }

    async callMethod(methodName){
        console.log(this.props);
        const jobApplicant = JobApplicant(this.props.jobApplicationAddress);
          
        this.setState({ loading: true, errorMessage: '' });
        try {
            
            const accounts = await web3.eth.getAccounts();
            
            switch (methodName) {
                case 'callForInterview':
                    await jobApplicant.methods.callForInterview()
                        .send({from:accounts[0]});
                    break;

                case 'cancelApplication':
                    await jobApplicant.methods.cancelApplication()
                        .send({from:accounts[0]});
                    break;

                default:
                    break;
            }
  
            Router.replaceRoute(`/listings/jobapplicants/${this.props.jobApplicationAddress}`);
        }
        catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading:false});
    }

    render(){
        return (
            <div>
            <Form onSubmit={this.onSubmitCallForInterview} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Call For Interview
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitCancelApplication} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                CancelApplication
                </Button>
            </Form>
            </div>
        );
    }

}

export default JobApplicationStageForm;