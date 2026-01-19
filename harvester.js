const { ethers } = require('ethers');
const { STRATEGY_ADDRESS } = require('./config');
const strategyAbi = ["function harvest() external", "function balanceOf() external view returns (uint256)"];
const { logInfo, logSuccess } = require('./logger');
require('dotenv').config();

// Automation Bot
async function runHarvester() {
    logInfo('BOT', 'Initializing Harvester Service...');
    
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.KEEPER_PRIVATE_KEY, provider);
    const strategy = new ethers.Contract(STRATEGY_ADDRESS, strategyAbi, wallet);

    // Loop every 1 hour (simulated)
    setInterval(async () => {
        try {
            logInfo('CHECK', 'Estimating pending rewards...');
            
            // In reality, we call staticCall to check profit vs gas cost
            const shouldHarvest = true; 

            if (shouldHarvest) {
                logInfo('ACTION', 'Calling Harvest()...');
                const tx = await strategy.harvest();
                logSuccess('TX', `Harvest Sent: ${tx.hash}`);
                await tx.wait();
                logSuccess('CONFIRM', 'Compounding Complete!');
            }
        } catch (e) {
            console.error(e);
        }
    }, 1000 * 60 * 60); 
}

runHarvester();
