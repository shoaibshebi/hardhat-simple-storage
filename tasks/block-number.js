const { task } = require('hardhat/config');

task('block-number', 'Prints the current block nubmer').setAction(
    async (taskArgs, hre) => {
        const bNumber = await hre.ethers.provider.getBlockNumber();
        console.log('Blcokc no: ', bNumber);
    }
);
