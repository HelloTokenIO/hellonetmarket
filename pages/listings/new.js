import React , {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react'
import Layout from '../../components/Layout';
import ListingsRegistry from '../../ethereum/listingsregistry';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes';

class ListingNew extends Component{
state= {
    name:'',
    workingHours:'',
    resourceType:'',
    resourceRate:'',
    totalResourceRequired:'',
    description:'',
    errorMessage: '',
    loading: false
};

onChange = (e, {name, value}) => this.setState({[name]: value});

onSubmit = async event => {
    event.preventDefault();

    const {name, workingHours, resourceType,resourceRate,totalResourceRequired, description}= this.state;

    this.setState({loading:true, errorMessage:''});

    try{

        const accounts = await web3.eth.getAccounts();

        await ListingsRegistry.methods
            .create('0x12', workingHours, resourceType, resourceRate, totalResourceRequired)
            .send({
                from: accounts[0]
            });

        Router.pushRoute('/');
    }
    catch(err){
        this.setState({loading: false});
    }
};

    render(){
        return (
            <Layout>
                <h3>Create Listing</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Input
                        label="Name" placeholder="Listing Name"
                        name='name'
                        value={this.state.name}
                        onChange={this.onChange} 
                    />

                    <Form.Input
                        label="HelloTokens per Hour" placeholder="HelloTokens per Hour"
                        name = 'resourceRate'
                        value={this.state.resourceRate}
                        onChange={this.onChange}                        
                    />

                    <Form.Input
                         label="Working Hours" placeholder="Working Hours"
                        name='workingHours'
                        value={this.state.workingHours}
                        onChange={this.onChange} 
                    />

                    <Form.Input
                         label="Total Resource Required" placeholder="Total Resource Required"
                        name='totalResourceRequired'
                        value={this.state.totalResourceRequired}
                        onChange={this.onChange} 
                    />

                    <Form.Input
                         label="Description" placeholder="Description"
                        name='description'
                        value={this.state.description}
                        onChange={this.onChange} 
                    />
                    <Message error header="Oops!" content={this.state.errorMessage}/>

                    <Button type='submit' loading={this.state.loading} primary>Create Listing</Button>
                </Form>

            </Layout>
    );
    };
};

export default ListingNew;