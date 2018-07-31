import React, {Component} from 'react';
import ListingsRegistry from '../ethereum/listingsregistry';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes'
class ListingIndex extends Component {
    static async getInitialProps() {
        const data = await ListingsRegistry.methods.getListings().call();

        // console.log(data);

        return {data};
    }


    renderListings() {
        const listingCards = this.props.data.map(c=> {
            return { 
               
             header: c,
             description: (
                <Link route={`/listings/${c}`}>
                  <a>View Listing</a>
                </Link>
              ),
            }
        }

        );

        return <Card.Group items={listingCards} />
    }

    render(){
        return (
        <Layout>
            <div>
                
                <h3>Listings</h3>
                <Button floated="right" content="Create Listing" icon="add circle" primary />
            {this.renderListings()}
            
            </div>
        </Layout>
        );
    }
} 

export default ListingIndex;



