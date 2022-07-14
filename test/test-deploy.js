const { assert, expect } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', function () {
    let simpleStorage, simpleStorageFactory;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
        simpleStorage = await simpleStorageFactory.deploy();
    });
    it('Should start with a favorite number of 0', async () => {
        const favoriteNumber = await simpleStorage.retrieve();
        assert.equal(favoriteNumber, 0);
    });
    it('Should update when we call store', async function () {
        const expectedValue = '7';
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
});
