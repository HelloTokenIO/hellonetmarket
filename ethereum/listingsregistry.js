import web3 from './web3';
import ListingsRegistry from './build/contracts/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10');

export default instance;