import web3 from './web3';
import ListingsRegistry from './build/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x3d49d1ef2ade060a33c6e6aa213513a7ee9a6241');

export default instance;