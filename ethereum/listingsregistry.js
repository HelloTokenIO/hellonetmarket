import web3 from './web3';
import ListingsRegistry from './build/contracts/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x2a050c32759e90b0434b7c493036f8882db31b0c');

export default instance;