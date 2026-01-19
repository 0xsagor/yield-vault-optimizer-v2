# Yield Vault Optimizer v2 🚜

![Solidity](https://img.shields.io/badge/Solidity-0.8.19-black) ![TVL](https://img.shields.io/badge/TVL-Tracking-green) ![Strategy](https://img.shields.io/badge/Strategy-Auto--Compound-blue)

## Protocol Overview

This repository implements a **Single-Asset Vault** system. Users deposit a token (e.g., USDC), and the Vault creates a "Strategy" that automatically farms rewards (e.g., CRV/SUSHI), sells them, and buys more of the underlying asset.

The result? **Compound Interest** without manual user intervention.

### Architecture

1.  **The Vault (`Vault.sol`)**:
    * Holds user funds.
    * Mints "Share" tokens (`vToken`) to depositors representing their share of the pool.
    * Security layer (Panic button, timelock).

2.  **The Strategy (`Strategy.sol`)**:
    * Interacts with 3rd party "MasterChefs" (Staking contracts).
    * `harvest()`: Claims rewards -> Swaps to Token -> Re-invests.

3.  **The Harvester (`harvester.js`)**:
    * Off-chain bot that monitors pending rewards and triggers the harvest transaction when profitable.

## Deployment & Testing

1.  **Install**: `npm install`
2.  **Config**: Set up `.env` with Mainnet/Fork RPC.
3.  **Deploy**:
    ```bash
    npx hardhat run scripts/deploy.js
    ```
4.  **Run Bot**:
    ```bash
    node harvester.js
    ```

## Safety
* **Entrance Fee**: 0%
* **Withdrawal Fee**: 0.1% (To prevent sandwich attacks on harvest)
* **Access Control**: Only authorized 'Keepers' can call harvest.

---
*Professional DeFi Asset Management.*
