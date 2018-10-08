pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";


contract Salt is MintableToken, StandardBurnableToken {
    string public name = "Salt";
    string public symbol = "SALT";
    uint8 public decimals = 8;
    uint public totalSupply = 21 * (10 ** 14);

    constructor() public {
        balances[msg.sender] = totalSupply;
    }
}
