require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.0",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:8545", // Địa chỉ mặc định của Ganache
      accounts: ["0x8e3b4972285e25ab2aae98fcc288389d0bcab2050cd02b7888778764fa4713e2"] // Sử dụng private key của tài khoản Ganache
    },

  },
};

