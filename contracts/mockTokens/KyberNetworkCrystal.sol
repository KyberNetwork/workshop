pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";


contract KyberNetworkCrystal is MintableToken, StandardBurnableToken {
    string public name = "KyberNetworkCrystal";
    string public symbol = "KNC";
    uint8 public decimals = 18;
    uint public totalSupply = 21 * (10 ** 24);

    constructor () public {
        balances[msg.sender] = totalSupply;
    }
}
