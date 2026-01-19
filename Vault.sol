// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Interfaces.sol";

contract Vault is ERC20, Ownable {
    IERC20 public want; // The token we are maximizing (e.g., USDC)
    address public strategy;

    constructor(address _want, address _strategy) ERC20("Vault Token", "vTKN") {
        want = IERC20(_want);
        strategy = _strategy;
    }

    // User deposits 'want' tokens, gets 'vTokens'
    function deposit(uint256 _amount) external {
        uint256 total = balance();
        uint256 shares = 0;
        
        if (totalSupply() == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalSupply()) / total;
        }

        want.transferFrom(msg.sender, address(this), _amount);
        want.transfer(strategy, _amount); // Send to strategy to farm
        IStrategy(strategy).deposit();

        _mint(msg.sender, shares);
    }

    // User burns 'vTokens', gets 'want' tokens back (plus profit)
    function withdraw(uint256 _shares) external {
        uint256 total = balance();
        uint256 amount = (_shares * total) / totalSupply();
        
        _burn(msg.sender, _shares);
        
        IStrategy(strategy).withdraw(amount);
        want.transfer(msg.sender, amount);
    }

    // Total assets managed by this vault
    function balance() public view returns (uint256) {
        return want.balanceOf(address(this)) + IStrategy(strategy).balanceOf();
    }
}
