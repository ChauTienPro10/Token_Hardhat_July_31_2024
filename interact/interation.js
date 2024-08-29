import Web3 from 'web3';
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

export async function deposit(value,sender) {
  
  
  try {
      const result = await contract.methods.deposit(value).send({ from: sender });
      console.log(`Transaction successful: ${result}`);
      return result;
  } catch (error) {
      console.error('Error calling deposit:', error);
  }
}



// goi cac ham trong hop dong thong minh
//lay token abi tu arifacts
const contractABI=[
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

const contractAddress=("0x2a0EaF0858444CfF89b6c001acacF054039d0ACD")
const contract = new web3.eth.Contract(contractABI, contractAddress);
async function callNameFunction() {
    try {
      const name = await contract.methods.name().call();
      console.log(`Contract name: ${name}`);
    } catch (error) {
      console.error('Error calling name function:', error);
    }
  }

getBlockNumber();
getBalance("0x5c42a72Ed9862e62d9a0D4601C4a46c85a13bffa");
checkContractExists("0x2a0EaF0858444CfF89b6c001acacF054039d0ACD");
callNameFunction();
getOwner();
// deposit(1000,"0x5c42a72Ed9862e62d9a0D4601C4a46c85a13bffa")
getTotalSupply();

