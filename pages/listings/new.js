import React , {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react'
import Layout from '../../components/Layout';
import ListingsRegistry from '../../ethereum/listingsregistry';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes';
import ipfs, { ipfsAddObject } from '../../ipfs/ipfs';
import ipfsUtils from '../../ipfs/ipfsUtils';

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
    const formState = this.state;

    try{
        // const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

        
        const formJson = JSON.stringify(formState);
        console.log(formJson);

        console.log('calling IPFS');
        const ipfsHash = await ipfsAddObject(formJson);
        console.log(ipfsHash);
        
        console.log('Finished IPFS');
        // var utf8 = unescape(encodeURIComponent(ipfsHash));

        // var arr = [];
        // for (var i = 0; i < utf8.length; i++) {
        //     arr.push(utf8.charCodeAt(i));
        // }
        var bytesHash = ipfsUtils.getBytes32FromIpfsHash(ipfsHash);
        // web3.utils.asciiToHex(ipfsHash); 
        // var bytesHash = web3.fromAscii(ipfsHash, 32);
        alert(bytesHash);

        const accounts = await web3.eth.getAccounts();
        // console.log(web3.utils.stringToHex(ipfsHash));
        // console.log(web3.utils.hexToBytes(web3.utils.stringToHex(ipfsHash)));

        await ListingsRegistry.methods
            .create(bytesHash, workingHours, resourceType, resourceRate, totalResourceRequired)
            .send({
                from: accounts[0]
            });

        Router.pushRoute('/listings');
    }
    catch(err){
        alert(err);
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