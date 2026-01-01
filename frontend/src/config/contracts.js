// Contract Configuration
// This file will be populated after contract deployment

/**
 * Get contract configuration
 * @returns {{address: string, abi: Array}} Contract address and ABI
 */
export const getContractConfig = () => {
    try {
        // Import contract address
        const contractAddress = require('./contract-address.json');
        // Import contract ABI
        const contractABI = require('./VotingSystem.json');

        return {
            address: contractAddress.VotingSystem,
            abi: contractABI,
            network: contractAddress.network,
            deployedAt: contractAddress.deployedAt
        };
    } catch (error) {
        console.error('Contract configuration not found. Please deploy contracts first.');
        console.error('Run: cd contracts && npx hardhat run scripts/deploy.js --network localhost');
        return {
            address: null,
            abi: [],
            network: null,
            deployedAt: null
        };
    }
};

export default getContractConfig;
