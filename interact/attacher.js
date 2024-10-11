import Web3 from 'web3';
const web3 = new Web3('http://localhost:8545');

// web3.eth.getBlockNumber()
//   .then(console.log);
//   web3.eth.getAccounts()
//   .then(accounts => {
//     console.log('Các tài khoản hiện có trong mạng:', accounts);
//   })
//   .catch(err => {
//     console.error('Lỗi khi lấy tài khoản:', err);
//   });

  export async function getOwner() {
    try {
        const ownerAddress = await contract.methods.owner().call();
        console.log(`Owner address: ${ownerAddress}`);
        return ownerAddress;
    } catch (error) {
        console.error('Error getting owner:', error);
    }
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

  export async function deposit(value, sender) {
    try {
        // Chỉ định phí gas (gasPrice)
        const gasPrice = await web3.eth.getGasPrice(); // Lấy giá gas hiện tại từ mạng

        // Gọi phương thức deposit với các tham số
        const result = await contract.methods.deposit(value).send({
            from: sender,
            gasPrice: gasPrice, // Thiết lập phí gas
            // Có thể thêm gas: 21000 nếu cần thiết
        });

        console.log(`Transaction successful: ${result}`);
        return result;
    } catch (error) {
        console.error('Error calling deposit:', error);
        throw error; // Ném lại lỗi để xử lý bên ngoài nếu cần
    }
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

const contractAddress=("0x0d5a9c83bdd08e09dfac339c9e5c236560cd25db")
const contract = new web3.eth.Contract(contractABI, contractAddress);


const account = web3.eth.accounts.privateKeyToAccount("0xe475baaf474149478a0fba84a02edd905f39edcaf6c6ce2d2484cd7baa2e0f4b");
web3.eth.accounts.wallet.add(account);

// getOwner();
// // getTokenOf("0x8d546EC8652B9BB72cBAaBDBDfe07b352ea89833");

// deposit(1000,"0x8d546EC8652B9BB72cBAaBDBDfe07b352ea89833")
// // getTokenOf("0x8d546EC8652B9BB72cBAaBDBDfe07b352ea89833");

// getBalance("0x8d546EC8652B9BB72cBAaBDBDfe07b352ea89833");

getTokenOf("0x8d546EC8652B9BB72cBAaBDBDfe07b352ea89833");