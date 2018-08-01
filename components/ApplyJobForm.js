import React , {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react'
import Listing from '../ethereum/listing';
import web3 from '../ethereum/web3';
import {Link, Router} from '../routes';

class ApplyJobForm extends Component{
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();
        console.log(this.props);
        const c = this.props.listingAddress;
        const listing = Listing(c);
        console.log(listing);
        this.setState({ loading: true, errorMessage: '' });
        try {
            
            const accounts = await web3.eth.getAccounts();

            await listing.methods.applyToJob()
            .send({from:accounts[0]});

            Router.replaceRoute(`/listings/${c}`);
        }
        catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading:false});
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} >
                </Message>
                <Button primary loading={this.state.loading}>
                    Apply For this Listing
                </Button>
            </Form>

        );
    }

}

export default ApplyJobForm;