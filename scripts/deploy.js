const { ethers, run, network } = require('hardhat');

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage'
    );
    console.log('Deployin Contract..');
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract address: ${simpleStorage.address}`); //contract address
    // what happens when we deploy to our hardhat network?
    //  only verify the contracts deployment, if you are on the live etherscan rinkeby test net
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log('Waiting for block confirmations...');
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);

    // Update the current value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log('Verifying contract...');
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes('already verified')) {
            console.log('Already Verified!');
        } else {
            console.log(e);
        }
    }
};

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
