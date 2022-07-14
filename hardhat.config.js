require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('./tasks/block-number');
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
    defaultNetwork: 'hardhat',
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: 'http://localhost:8545',
            // accounts: Thanks hardhat for this!,
            chainId: 31337,
        },
    },
    solidity: '0.8.9',
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};
