// const IPFS = require('ipfs-mini');
// const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
 
// const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

// const IPFS = require('ipfs-api');
// const ipfs = new IPFS({
//                     host: 'ipfs.infura.io', 
//                     port: 5001,
//                     protocol: 'https'
//                 });

import IPFS from 'ipfs-mini';
import isString from 'lodash/fp/isString';

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const ipfsFileUrlPrefix = 'https://ipfs.io/ipfs/';

export async function ipfsGetData (multihash) {
  if (!isString(multihash)) {
    return new Error('multihash must be String')
  } else if (!multihash.startsWith('Qm')) {
    return new Error('multihash must start with "Qm"')
  }

  return new Promise((resolve, reject) => {
    ipfs.catJSON(multihash, (err, result) => {
      if (err) reject(new Error(err))
      resolve(result)
    })
  })
}

export async function ipfsAddObject (obj) {
  const CID = await new Promise((resolve, reject) => {
    ipfs.addJSON(obj, (err, result) => {
      if (err) reject(new Error(err))
      resolve(result)
    })
  })
  console.log('CID:', CID)
  return CID
}

export default ipfs;

