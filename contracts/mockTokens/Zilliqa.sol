pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";


contract Zilliqa is MintableToken, StandardBurnableToken {
    string public name = "Zilliqa";
    string public symbol = "ZIL";
    uint8 public decimals = 12;
    uint public totalSupply = 21 * (10 ** 18);

    constructor() public {
        balances[msg.sender] = totalSupply;
    }
}
