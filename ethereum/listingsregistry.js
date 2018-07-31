import web3 from './web3';
import ListingsRegistry from './build/ListingsRegistry.json';

const instance = new web3.eth.Contract(ListingsRegistry.abi, '0x4e71920b7330515faf5ea0c690f1ad06a85fb60c');

export default instance;