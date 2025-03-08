import Web3 from 'web3';
import Certificate from './Certificate.json' assert { type: 'json' };
import HDWalletProvider from '@truffle/hdwallet-provider';

// const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');

const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY;
const accountAddress = process.env.ACCOUNT_ADDRESS;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new HDWalletProvider({
  privateKeys: [accountPrivateKey],
  providerOrUrl:
    'https://eth-sepolia.g.alchemy.com/v2/OTJ_9qykNvAEF9GyYjNRh6Sniy91WG2L',
});

const web3Connection = new Web3(provider);

const contractInstance = new web3Connection.eth.Contract(
  Certificate.abi,
  contractAddress
);

const deployerAddress = accountAddress;

export { contractInstance, deployerAddress };
