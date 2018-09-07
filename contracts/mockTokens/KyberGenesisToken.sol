pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";


contract KyberGenesisToken is StandardToken, StandardBurnableToken {
    string public name = "KyberGenesisToken";
    string public symbol = "KGT";
    uint8 public decimals = 0;
    uint public totalSupply = 39485;

    constructor () public {
        balances[msg.sender] = totalSupply;
    }
}
