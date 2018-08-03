import web3 from './web3';
import ListingsRegistry from './build/contracts/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x345ca3e014aaf5dca488057592ee47305d9b3e10');

export default instance;