import web3 from './web3';
import ListingsRegistry from './build/contracts/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x7c9533d4797062cf4b59cd55711e6a4693887090');

export default instance;