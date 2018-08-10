import web3 from './web3';
import ListingsRegistry from './build/contracts/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x046eedc1f46bed64ef000f0c7f2fd7caf00058ce');

export default instance;