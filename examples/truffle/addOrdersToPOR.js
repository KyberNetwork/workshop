// All code examples in this guide have not been audited and should not be used in production.
// If so, it is done at your own risk!

/* global artifacts, web3 */
/* eslint-disable no-underscore-dangle */
const BN = require('bn.js');
const moment = require('moment');

const OrderbookReserve = artifacts.require('./permissionless/OrderbookReserve.sol');
const OrderbookReserveLister = artifacts.require(
  './permissionless/PermissionlessOrderbookReserveLister.sol',
);

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const SNT = artifacts.require('./mockTokens/Status.sol');

function stdlog(input) {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${input}`);
}

module.exports = async (callback) => {
  const accounts = web3.eth.accounts._provider.addresses;
  const userWallet = accounts[4];

  // Set the instances
  const OrderbookReserveListerInstance = await OrderbookReserveLister.at(
    OrderbookReserveLister.address,
  );
  const KNCInstance = await KNC.at(KNC.address);
  const SNTInstance = await SNT.at(SNT.address);

  // Get address of POR and set instance
  const PORAddress = await OrderbookReserveListerInstance.reserves.call(SNT.address);
  const OrderbookReserveInstance = await OrderbookReserve.at(PORAddress);

  // Set token amounts to transfer
  const KNCStake = new BN(1000).mul(new BN(10).pow(await KNCInstance.decimals())).toString();
  const ETHAmount = 25;
  const SNTAmount = new BN(150000).mul(new BN(10).pow(await SNTInstance.decimals())).toString();

  // Set the token BUY and SELL order amounts
  const ETHSell = web3.utils.toWei(new BN(10));
  const TokenBuy = new BN(62750).mul(new BN(10).pow(await SNTInstance.decimals())).toString();
  const ETHBuy = web3.utils.toWei(new BN(10));
  const TokenSell = new BN(62700).mul(new BN(10).pow(await SNTInstance.decimals())).toString();

  // Approve the POR contract to spend user's tokens
  await KNCInstance.approve(OrderbookReserveInstance.address, web3.utils.toWei(new BN(1000000)), {
    from: userWallet,
  });
  await SNTInstance.approve(OrderbookReserveInstance.address, web3.utils.toWei(new BN(1000000)), {
    from: userWallet,
  });

  stdlog('- START -');
  stdlog(`OrderbookReserve (${OrderbookReserveInstance.address})`);

  // Stake KNC for orders and fees
  await OrderbookReserveInstance.depositKncForFee(userWallet, KNCStake, { from: userWallet });
  stdlog(
    `Staked ${web3.utils.fromWei(KNCStake)} to OrderbookReserve (${
      OrderbookReserveInstance.address
    })`,
  );

  // Deposit ETH to POR
  await OrderbookReserveInstance.depositEther(userWallet, {
    from: userWallet,
    value: web3.utils.toWei(new BN(ETHAmount)),
  });
  stdlog(`Deposited ${ETHAmount} ETH to OrderbookReserve (${OrderbookReserveInstance.address})`);

  // Deposit Tokens to POR
  await OrderbookReserveInstance.depositToken(userWallet, SNTAmount, { from: userWallet });
  stdlog(
    `Deposited ${web3.utils.fromWei(SNTAmount)} tokens to OrderbookReserve (${
      OrderbookReserveInstance.address
    })`,
  );

  // Submit Limit BUY order
  await OrderbookReserveInstance.submitEthToTokenOrder(ETHSell, TokenBuy, { from: userWallet });
  stdlog(`Submitted Limit BUY order to OrderbookReserve (${OrderbookReserveInstance.address})`);

  // Submit Limit SELL order
  await OrderbookReserveInstance.submitTokenToEthOrder(TokenSell, ETHBuy, { from: userWallet });
  stdlog(`Submitted Limit SELL order to OrderbookReserve (${OrderbookReserveInstance.address})`);

  stdlog('- END -');
  callback();
};
