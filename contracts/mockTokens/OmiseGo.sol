pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";


contract OmiseGo is MintableToken, StandardBurnableToken {
    string public name = "OmiseGo";
    string public symbol = "OMG";
    uint8 public decimals = 18;
    uint public totalSupply = 21 * (10 ** 24);

    constructor() public {
        balances[msg.sender] = totalSupply;
    }
}
