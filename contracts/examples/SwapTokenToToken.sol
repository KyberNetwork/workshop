pragma solidity ^0.4.24;

import "../KyberNetworkProxy.sol";


contract SwapTokenToToken {
    event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken, uint amount);

    KyberNetworkProxy public proxy;

    /// @dev Contract contstructor
    //@param _proxy KyberNetworkProxy contract address
    constructor (KyberNetworkProxy _proxy) public {
        proxy = _proxy;
    }

    //@dev Swap the user's ERC20 token to another ERC20 token
    //@param srcToken source token contract address
    //@param srcQty amount of source tokens
    //@param destToken destination token contract address
    //@param destAddress address to send swapped tokens to
    function execSwap(ERC20 srcToken, uint srcQty, ERC20 destToken, address destAddress) public payable {
        uint minConversionRate;

        // Check that the player has transferred the token to this contract
        require(srcToken.transferFrom(msg.sender, this, srcQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(srcToken.approve(proxy, 0));

        // Set the spender's token allowance to tokenQty
        require(srcToken.approve(proxy, srcQty));

        // Get the minimum conversion rate
        (minConversionRate,) = proxy.getExpectedRate(token, ETH_TOKEN_ADDRESS, tokenQty);

        // Swap the ERC20 token to ETH
        uint destAmount = proxy.swapTokenToToken(srcToken, srcQty, destToken, minConversionRate);

        // Send the swapped tokens to the destination address
        require(destToken.transfer(destAddress, destAmount));

        // Log the event
        emit Swap(msg.sender, srcToken, destToken, destAmount);
    }
}
