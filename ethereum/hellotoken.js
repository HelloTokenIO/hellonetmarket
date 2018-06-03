import web3 from './web3';
import HelloToken from './build/HelloToken.json';

const instance = new web3.eth.Contract(
    HelloToken.abi, '0x1bb54d9A15fF1Fe54f2fd5F43F08d4d299FdAe87'
);

export default instance;

