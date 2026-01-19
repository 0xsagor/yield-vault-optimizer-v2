// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Interfaces.sol";

contract Strategy is Ownable {
    address public want;
    address public masterChef; // The 3rd party farming contract
    uint256 public poolId;
    address public vault;

    constructor(address _want, address _masterChef, uint256 _pid) {
        want = _want;
        masterChef = _masterChef;
        poolId = _pid;
        vault = msg.sender;
    }

    function deposit() public {
        uint256 balance = IERC20(want).balanceOf(address(this));
        if (balance > 0) {
            IERC20(want).approve(masterChef, balance);
            IMasterChef(masterChef).deposit(poolId, balance);
        }
    }

    function withdraw(uint256 _amount) external {
        require(msg.sender == vault, "!vault");
        IMasterChef(masterChef).withdraw(poolId, _amount);
        IERC20(want).transfer(vault, _amount);
    }

    // The magic function: Claim Rewards -> Swap -> Reinvest
    function harvest() external {
        // 1. Claim Rewards
        IMasterChef(masterChef).deposit(poolId, 0); 
        
        // 2. Logic to swap RewardToken -> WantToken would go here
        // (Abstracted for brevity, usually involves Uniswap Router)
        
        // 3. Re-invest
        deposit();
    }

    function balanceOf() external view returns (uint256) {
        (uint256 amount, ) = IMasterChef(masterChef).userInfo(poolId, address(this));
        return amount;
    }
}
