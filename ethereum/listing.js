import web3 from './web3';
import Listing from './build/contracts/Listing.json';

// const instance = new web3.eth.Contract(Listing.abi, '0xeec918d74c746167564401103096D45BbD494B74');

// export default instance;


export default address => {
    return new web3.eth.Contract(Listing.abi, address);
  };
  