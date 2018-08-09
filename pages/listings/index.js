import React, {Component} from 'react';
import ListingsRegistry from '../../ethereum/listingsregistry';
import { Card, Button, Pagination } from 'semantic-ui-react';
import Layout from  '../../components/Layout';
import {Link, Router} from '../../routes';

class ListingIndex extends Component {

    static async getInitialProps(context) {
        // const data = await ListingsRegistry.methods.getListings().call();
        console.log(context);
        var activePage = context.query.pageNumber;
        if (activePage === undefined){
            activePage = 1;
        }

        const pageSize = 2;

        const listingsCount = await ListingsRegistry.methods.listingsLength().call();

        const data = await ListingsRegistry.methods.fetchPage( pageSize*(activePage-1), pageSize).call();
        console.log(data);
        
        return {
            listingsCount: listingsCount,
            activePage: activePage, 
            totalPages: Math.ceil(listingsCount / pageSize), 
            data:data
        };
    }

    handlePaginationChange = (e, {activePage}) => {
        Router.replaceRoute(`/listings/index/${activePage}`);
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
              fluid: true
            };
        });

        return (
        <div>
            {/* <Pagination defaultActivePage={1} totalPages={10} /> */}
            <Card.Group items={listingCards} />
            <Pagination
                activePage={this.props.activePage} 
                onPageChange = {this.handlePaginationChange}
                totalPages={this.props.totalPages} />
        </div>
        )
    }

    render(){
        return (
        <Layout>
            <div>
                
                <h3>Listings</h3>
                <Button floated="right" content="Create Listing" icon="add circle" primary>
                </Button>
            {this.renderListings()}
            
            </div>
        </Layout>
        );
    }
} 

export default ListingIndex;



