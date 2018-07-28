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
                    <Form.Field>
                        <Input label="Name" placeholder="Listing Name"
                        value={this.state.name}
                        onChange={event=>
                            this.setState({name:event.target.value})
                        }
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input label="HelloTokens per Hour" placeholder="HelloTokens per Hour"
                        value={this.state.resourceRate}
                        onChange={event=>
                            this.setState({resourceRate:event.target.value})
                        }
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input label="Working Hours" placeholder="Working Hours"
                        value={this.state.workingHours}
                        onChange={event=>
                            this.setState({workingHours:event.target.value})
                        }
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input label="Total Resource Required" placeholder="Total Resource Required"
                        value={this.state.totalResourceRequired}
                        onChange={event=>
                            this.setState({totalResourceRequired:event.target.value})
                        }
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input label="Description" placeholder="Description"
                        value={this.state.description}
                        onChange={event=>
                            this.setState({description:event.target.value})
                        }
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}/>

                    <Button type='submit' loading={this.state.loading} primary>Create Listing</Button>
                </Form>

            </Layout>
    );
    };
};

export default ListingNew;