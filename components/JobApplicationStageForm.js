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

    onSubmitRejectApplication = async event => {
        event.preventDefault();
        this.callMethod('rejectApplication');
    }
    onSubmitInterviewSuccessful = async event => {
        event.preventDefault();
        this.callMethod('interviewSuccessful');
    }
    onSubmitInterviewNotSelected = async event => {
        event.preventDefault();
        this.callMethod('interviewNotSelected');
    }
    onSubmitOfferJob = async event => {
        event.preventDefault();
        this.callMethod('offerJob');
    }
    onSubmitAcceptJobOffer = async event => {
        event.preventDefault();
        this.callMethod('acceptJobOffer');
    }
    onSubmitRejectJobOffer = async event => {
        event.preventDefault();
        this.callMethod('rejectJobOffer');
    }
    onSubmitStartEmployment = async event => {
        event.preventDefault();
        this.callMethod('startEmployment');
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
             
                case 'rejectApplication':
                    await jobApplicant.methods.rejectApplication()
                        .send({from:accounts[0]});
                    break;
                
                case 'interviewSuccessful':
                    await jobApplicant.methods.interviewSuccessful()
                        .send({from:accounts[0]});
                    break;
                
                case 'interviewNotSelected':
                    await jobApplicant.methods.interviewNotSelected()
                        .send({from:accounts[0]});
                    break;
                
                case 'offerJob':
                    await jobApplicant.methods.offerJob()
                        .send({from:accounts[0]});
                    break;

                case 'acceptJobOffer':
                    await jobApplicant.methods.acceptJobOffer()
                        .send({from:accounts[0]});
                    break;

                case 'rejectJobOffer':
                    await jobApplicant.methods.rejectJobOffer()
                        .send({from:accounts[0]});
                    break;

                case 'startEmployment':
                    await jobApplicant.methods.startEmployment()
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

            <Form onSubmit={this.onSubmitRejectApplication} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Reject Application
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitInterviewSuccessful} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                 Interview Successful
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitInterviewNotSelected} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Interview Not Selected
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitOfferJob} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Offer Job 
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitAcceptJobOffer} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Accept Job Offer
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitRejectJobOffer} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Reject Job Offer
                </Button>
            </Form>

            <Form onSubmit={this.onSubmitStartEmployment} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                Start Employment
                </Button>
            </Form>

            </div>
        );
    }

}

export default JobApplicationStageForm;