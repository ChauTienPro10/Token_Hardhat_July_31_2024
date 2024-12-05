import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const OWNER = process.env.OWNER;
const web3 = new Web3('HTTP://127.0.0.1:8545');

export async function getBlockNumber() { // xem so khoi cua server
  const currentBlock = await web3.eth.getBlockNumber();
  console.log(`Current block number: ${currentBlock}`);
  return currentBlock.toString();
}
export async function getBalance(address) { // xem so du cua dia chi 
  try {
    const balance = await web3.eth.getBalance(address);
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    console.log(`Balance of ${address} is ${balanceInEther} ETH`);
  } catch (error) {
    console.error('Error getting balance:', error);
  }
}
function stringifyBigInt(obj) {
  return JSON.stringify(obj, (key, value) => {
    return typeof value === 'bigint' ? value.toString() : value;
  });
}

export async function getTokenOf(address) {
  try {
    const result = await contract.methods.balanceOf(address).call();
    console.log(`Token of ${address}: ${result}`);
    return result;
  } catch (error) {
    console.error('Error calling deposit:', error);
  }
}

export async function checkContractExists(contractAddress) { // kiem tra hop dong co trong server hay khong
  try {
    const code = await web3.eth.getCode(contractAddress);
    if (code !== '0x') {
      console.log(`Contract at ${contractAddress} exists.`);
    } else {
      console.log(`Contract at ${contractAddress} does not exist.`);
    }
  } catch (error) {
    console.error('Error checking contract existence:', error);
  }
}

export async function getOwner() {
  try {
    const ownerAddress = await contract.methods.owner().call();
    console.log(`Owner address: ${ownerAddress}`);
    return ownerAddress;
  } catch (error) {
    console.error('Error getting owner:', error);
  }
}

export async function getTotalSupply() {
  try {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(`Total Supply: ${totalSupply}`);
    return totalSupply;
  } catch (error) {
    console.error('Error getting total supply:', error);
  }
}

export async function deposit(value, sender) {// them khóa, không thêm địa chỉ 
  try {
    // Lấy giá gas hiện tại từ mạng (Ganache)
    const gasPrice = await web3.eth.getGasPrice();
    await web3.eth.accounts.wallet.add('0x8e3b4972285e25ab2aae98fcc288389d0bcab2050cd02b7888778764fa4713e2');

    // Gọi phương thức deposit mà không sử dụng các tham số EIP-1559
    const result = await contract.methods.deposit(value).send({
      from: sender,
      gas: 3000000, // Bạn có thể điều chỉnh gas nếu cần
      gasPrice: gasPrice // Sử dụng gasPrice truyền thống
    });

    console.log(`Transaction successful: ${result}`);
    return result;
  } catch (error) {
    console.error('Error calling deposit:', error);
  }
}

export async function transferTokens(value, toAddress, sender, key) {
  try {
    console.log(value);
    console.log(toAddress);
    const gasPrice = await web3.eth.getGasPrice();
    await web3.eth.accounts.wallet.add(key);
    const result = await contract.methods.transfer(toAddress, value).send({
      from: sender,
      gas: 3000000, // Bạn có thể điều chỉnh gas nếu cần
      gasPrice: gasPrice // Sử dụng gasPrice truyền thống
    });

    return result.status;
  } catch (error) {
    console.error('Error calling deposit:', error);
  }
}

export async function addKeyToBlockChain(key) {
  web3.eth.accounts.wallet.add(key);
}

export async function createNewAccount() {
  const senderAddress = '0x320622231715a3C30307B74Ba0f5Fe7a919086bA';  // Thay thế bằng địa chỉ của bạn
  const privateKey = '0x8e3b4972285e25ab2aae98fcc288389d0bcab2050cd02b7888778764fa4713e2';
  const account = await web3.eth.accounts.create();
  const recipientAddress = account.address;  // Địa chỉ mới được tạo
  const amountInEther = '5.00';
  sendETH(senderAddress, privateKey, recipientAddress, amountInEther);
  console.log(account.address);
  console.log(account.privateKey);

  web3.eth.accounts.wallet.add(account);

  return {
    address: account.address,
    privateKey: account.privateKey
  }
}
async function sendETH(fromAddress, privateKey, toAddress, amount) {
  try {
    const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest');

    // Estimate the gas required for the transaction
    const gasEstimate = await web3.eth.estimateGas({
      from: fromAddress,
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether'),
    });

    const transaction = {
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether'), // Amount in ETH
      gas: gasEstimate,
      gasPrice: web3.utils.toWei('20', 'gwei'), // Setting gasPrice manually (adjustable)
      nonce: nonce,
    };

    // Sign the transaction with the sender's private key
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Custom serialization to handle BigInt
    console.log('Transaction receipt:', JSON.stringify(receipt, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return receipt;

  } catch (error) {
    console.error('Error sending ETH:', error);
  }
}


// goi cac ham trong hop dong thong minh
//lay token abi tu arifacts
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_unlockTime",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownerAdd",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unlockTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const contractAddress = ("0x490d1ce939ddee87ae5489c13312e8e5cd6ac304")
const contract = new web3.eth.Contract(contractABI, contractAddress);
async function callNameFunction() {
  try {
    const name = await contract.methods.name().call();
    console.log(`Contract name: ${name}`);
  } catch (error) {
    console.error('Error calling name function:', error);
  }
}
export default web3


// deposit(100, '0x320622231715a3C30307B74Ba0f5Fe7a919086bA')




// 0x320622231715a3C30307B74Ba0f5Fe7a919086bA
// 0x8e3b4972285e25ab2aae98fcc288389d0bcab2050cd02b7888778764fa4713e2


// Transaction: 0xedc61f40e005d5fdb80ff51e2291510efffd3ae37ed572edf6e44d70997f4f83
// 2024-11-02 16:06:24   Contract created: 0x490d1ce939ddee87ae5489c13312e8e5cd6ac304
// 2024-11-02 16:06:24   Gas usage: 1003228
// 2024-11-02 16:06:24   Block Number: 9
// 2024-11-02 16:06:24   Block Time: Sat Nov 02 2024 09:06:23 GMT+0000 (Coordinated Universal Time)


checkContractExists('0x490d1ce939ddee87ae5489c13312e8e5cd6ac304');
getOwner()
getBalance('0x320622231715a3C30307B74Ba0f5Fe7a919086bA');

getTokenOf('0x320622231715a3C30307B74Ba0f5Fe7a919086bA')