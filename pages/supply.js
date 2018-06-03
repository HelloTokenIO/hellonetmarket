import React, {Component} from 'react';
import HelloToken from '../ethereum/hellotoken';

class TokenSupply extends Component {
    static async getInitialProps() {
        const supply = await HelloToken.methods.totalSupply().call();

        console.log(supply);

        return {supply};
    }

    render(){
        return <div>{this.props.supply}</div>;
    }
} 

export default TokenSupply;