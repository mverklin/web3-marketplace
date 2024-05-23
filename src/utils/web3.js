import Web3 from 'web3';

// Replace with your Coinbase Base node URL
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

export const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts;
};

export const sendTransaction = async (from, to, value) => {
  const transaction = {
    from,
    to,
    value,
    gas: 21000,
    gasPrice: await web3.eth.getGasPrice(),
  };
  
  return await web3.eth.sendTransaction(transaction);
};
