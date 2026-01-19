const { ethers } = require('ethers');

/**
 * Calculates estimated APY based on block rewards
 */
function calculateAPY(rewardPerBlock, tokenPrice, tvl, blocksPerYear) {
    const rewardsPerYear = rewardPerBlock * blocksPerYear;
    const valuePerYear = rewardsPerYear * tokenPrice;
    
    if (tvl === 0) return 0;

    const apr = (valuePerYear / tvl) * 100;
    
    // Convert APR to APY (Assuming daily compounding)
    const apy = (Math.pow(1 + (apr / 100 / 365), 365) - 1) * 100;
    
    return apy.toFixed(2);
}

// Example usage
const apy = calculateAPY(1.5, 10, 1000000, 2628000); // 1.5 Tokens/block, $10 price, $1M TVL
console.log(`Estimated APY: ${apy}%`);
