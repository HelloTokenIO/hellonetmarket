import web3 from './web3';
import JobApplicant from './build/JobApplicant.json';

export default address => {
    return new web3.eth.Contract(JobApplicant.abi, address);
  };
  