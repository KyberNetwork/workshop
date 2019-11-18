/* global artifacts, web3 */
/* eslint-disable no-unused-vars, no-eval, no-underscore-dangle */
const BN = require('bn.js');
const fs = require('fs');

const Network = artifacts.require('./KyberNetwork.sol');
const OrderbookReserve = artifacts.require('./reserves/KyberOrderbookReserve.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const POLY = artifacts.require('./mockTokens/Polymath.sol');

const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

function tx(result, call) {
  const logs = (result.logs.length > 0) ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   Calling ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.tx}`);
  console.log(`   > contract address: ${logs.address}`);
  console.log(`   > gas used: ${result.receipt.gasUsed}`);
  console.log(`   > event: ${logs.event}`);
  console.log();

  return result.receipt.blockNumber;
}

module.exports = async (deployer, network, accounts) => {
  const admin = accounts[0];
  const operator = accounts[1];

  // Set the instances
  const NetworkInstance = await Network.at(Network.address);
  const OrderbookReserveInstance = await OrderbookReserve.at(OrderbookReserve.address);
  const KNCInstance = await KNC.at(KNC.address);
  const POLYInstance = await POLY.at(POLY.address);

  // Initialize the permissioned orderbook reserve`
  tx(
    await OrderbookReserveInstance.init(),
    'init()',
  );

  // Add reserve to network
  tx(await NetworkInstance.addReserve(OrderbookReserve.address, false, { from: operator }), 'addReserve()');

  // List token pairs for the reserve
  tx(
    await NetworkInstance.listPairForReserve(
      OrderbookReserve.address,
      POLY.address,
      true,
      true,
      true,
      { from: operator },
    ),
    'listPairForReserve()',
  );

  // Set token amounts to transfer
  const KNCStake = (
    new BN(
      tokenConfig.PermissionedOrderbookReserve.POLY.KNCStake,
    ).mul(new BN(10).pow(await KNCInstance.decimals()))
  ).toString();
  const ETHDeposit = web3.utils.toWei(
    new BN(tokenConfig.PermissionedOrderbookReserve.POLY.ETHDeposit),
  ).toString();
  const TokenDeposit = (
    new BN(
      tokenConfig.PermissionedOrderbookReserve.POLY.TokenDeposit,
    ).mul(new BN(10).pow(await POLYInstance.decimals()))
  ).toString();

  // Set the token BUY and SELL order amounts
  const ETHSell = web3.utils.toWei(
    new BN(tokenConfig.PermissionedOrderbookReserve.POLY.ETHSell),
  ).toString();
  const TokenBuy = (
    new BN(
      tokenConfig.PermissionedOrderbookReserve.POLY.TokenBuy,
    ).mul(new BN(10).pow(await POLYInstance.decimals()))
  ).toString();
  const ETHBuy = web3.utils.toWei(
    new BN(tokenConfig.PermissionedOrderbookReserve.POLY.ETHBuy),
  ).toString();
  const TokenSell = (
    new BN(
      tokenConfig.PermissionedOrderbookReserve.POLY.TokenSell,
    ).mul(new BN(10).pow(await POLYInstance.decimals()))
  ).toString();

  // Approve the POR contract to spend user's tokens
  await KNCInstance.approve(
    OrderbookReserve.address,
    new BN(2).pow(new BN(255)), // approve highest value 2^255
  );
  await POLYInstance.approve(
    OrderbookReserve.address,
    new BN(2).pow(new BN(255)), // approve highest value 2^255
  );

  // Stake KNC for orders and fees
  tx(
    await OrderbookReserveInstance.depositKncForFee(
      admin,
      KNCStake,
    ),
    'depositKncForFee()',
  );

  // Deposit ETH to POR
  tx(
    await OrderbookReserveInstance.depositEther(
      admin,
      { value: ETHDeposit },
    ),
    'depositEther()',
  );

  // Deposit Tokens to POR
  tx(
    await OrderbookReserveInstance.depositToken(
      admin,
      TokenDeposit,
    ),
    'depositToken()',
  );

  // Submit Limit BUY order
  tx(
    await OrderbookReserveInstance.submitEthToTokenOrder(
      ETHSell,
      TokenBuy,
    ),
    'submitEthToTokenOrder()',
  );

  // Submit Limit SELL order
  tx(
    await OrderbookReserveInstance.submitTokenToEthOrder(
      TokenSell,
      ETHBuy,
    ),
    'submitTokenToEthOrder()',
  );
};
