// All code examples in this guide have not been audited and should not be used in production.
// If so, it is done at your own risk!

pragma solidity ^0.4.18;

import "../KyberNetworkProxy.sol";


contract Trade {
    event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken);

    KyberNetworkProxy public proxy;
    ERC20 constant internal ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    //@dev Contract contstructor
    //@param _proxy KyberNetworkProxy contract address
    function Trade(KyberNetworkProxy _proxy) public {
        proxy = _proxy;
    }

    //@dev Swap the user's ETH to another ERC20 token
    //@param destToken destination token contract address
    //@param destAddress address to send swapped tokens to
    //@param maxDestAmount address to send swapped tokens to
    function execSwapETH(
        ERC20 destToken,
        address destAddress,
        uint maxDestAmount
    ) public payable {
        uint minConversionRate;
        // Get the minimum conversion rate
        (minConversionRate,) = proxy.getExpectedRate(ETH_TOKEN_ADDRESS, destToken, msg.value);

        // Swap the ERC20 token and send to destAddress
        proxy.trade.value(msg.value)(
            ETH_TOKEN_ADDRESS,
            msg.value,
            destToken,
            destAddress,
            maxDestAmount,
            minConversionRate,
            0
        );

        // Log the event
        Swap(msg.sender, ETH_TOKEN_ADDRESS, destToken);
    }

    //@dev Swap the user's ERC20 token to ETH or another ERC20 token
    //@param srcToken source token contract address
    //@param srcQty amount of source tokens
    //@param destToken destination token contract address
    //@param destAddress address to send swapped tokens to
    //@param maxDestAmount address to send swapped tokens to
    function execSwap(
        ERC20 srcToken,
        uint srcQty,
        ERC20 destToken,
        address destAddress,
        uint maxDestAmount
    ) public {
        uint minConversionRate;

        // Check that the token transferFrom has succeeded
        require(srcToken.transferFrom(msg.sender, address(this), srcQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(srcToken.approve(address(proxy), 0));

        // Set the spender's token allowance to tokenQty
        require(srcToken.approve(address(proxy), srcQty));

        // Get the minimum conversion rate
        (minConversionRate,) = proxy.getExpectedRate(srcToken, destToken, srcQty);

        // Swap the ERC20 token and send to destAddress
        proxy.trade(
            srcToken,
            srcQty,
            destToken,
            destAddress,
            maxDestAmount,
            minConversionRate,
            0
        );

        // Log the event
        Swap(msg.sender, srcToken, destToken);
    }
}
