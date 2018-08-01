import web3 from './web3';
import ListingsRegistry from './build/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x82d50ad3c1091866e258fd0f1a7cc9674609d254');

export default instance;