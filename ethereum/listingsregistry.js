import web3 from './web3';
import ListingsRegistry from './build/contracts/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6');

export default instance;