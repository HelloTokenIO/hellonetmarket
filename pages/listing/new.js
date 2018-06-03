import React , {Component} from 'react';
import {Form, Button, Input} from 'semantic-ui-react'
import Layout from '../../components/Layout';

class ListingNew extends Component{
state= {
    name:'',
    tokensPerHour:'',
    description:''
};

onSubmit = ()=> {

};

    render(){
        return (
            <Layout>
                <h3>Create Listing</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <Input label="Name" placeholder="Listing Name"
                        value={this.state.name}
                        onChange={event=>
                            this.setState({name:event.target.value})
                        }
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input label="HelloTokens per Hour" placeholder="HelloTokens per Hour"/>
                    </Form.Field>
                    <Form.Field>
                        <Input label="Description" placeholder="Description"/>
                    </Form.Field>
                    <Form.Field>
                        <Input label="Timing Needed" placeholder="Timing Needed"/>
                    </Form.Field>
                    <Form.Field>
                        <Input label="Timezone" placeholder="Timezone"/>
                    </Form.Field>
                    <Form.Field>
                        <Input label="Qualifications" placeholder="Qualifications"/>
                    </Form.Field>

                    <Button type='submit' primary>Create Listing</Button>
                </Form>

            </Layout>
    );
    };
};

export default ListingNew;