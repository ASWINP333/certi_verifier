import Web3 from 'web3';
import Certificate from './Certificate.json' assert { type: 'json' };
import deployer from './deployer.json' assert { type: 'json' };
import HDWalletProvider from '@truffle/hdwallet-provider';

// const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');

const provider = new HDWalletProvider({
  privateKeys: [
    '394fa991958c3b7d5472288c4b5a73e8ade67acfe295e8de19d309981395d5b0',
  ],
  providerOrUrl:
    'https://eth-sepolia.g.alchemy.com/v2/OTJ_9qykNvAEF9GyYjNRh6Sniy91WG2L',
});

const web3Connection = new Web3(provider);

const contractInstance = new web3Connection.eth.Contract(
  Certificate.abi,
  Certificate.networks['11155111'].address
);

const deployerAddress = deployer.from;

export { contractInstance, deployerAddress };
