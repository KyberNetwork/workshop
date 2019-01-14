/* global artifacts, web3 */
/* eslint-disable no-unused-vars, no-eval, no-underscore-dangle */
const BN = require('bn.js');
const fs = require('fs');

const OrderbookReserve = artifacts.require('./permissionless/OrderbookReserve.sol');
const OrderbookReserveLister = artifacts.require('./permissionless/PermissionlessOrderbookReserveLister.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const SNT = artifacts.require('./mockTokens/Status.sol');

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

  // Set the instances
  const OrderbookReserveListerInstance = await OrderbookReserveLister.at(
    OrderbookReserveLister.address,
  );
  const KNCInstance = await KNC.at(KNC.address);
  const SNTInstance = await SNT.at(SNT.address);

  // Add new permissionless orderbook reserve
  tx(
    await OrderbookReserveListerInstance.addOrderbookContract(
      SNT.address,
    ),
    'addOrderbookContract()',
  );

  // Initialize the permissionless orderbook reserve`
  tx(
    await OrderbookReserveListerInstance.initOrderbookContract(
      SNT.address,
    ),
    'initOrderbookContract()',
  );

  // List the permissionless orderbook reserve
  tx(
    await OrderbookReserveListerInstance.listOrderbookContract(
      SNT.address,
    ),
    'listOrderbookContract()',
  );

  // Get address of POR and set instance
  const PORAddress = await OrderbookReserveListerInstance.reserves.call(SNT.address);
  const OrderbookReserveInstance = await OrderbookReserve.at(PORAddress);

  // Set token amounts to transfer
  const KNCStake = (
    new BN(1000).mul(new BN(10).pow(await KNCInstance.decimals()))
  ).toString();
  const ETHAmount = 25;
  const SNTAmount = (
    new BN(150000).mul(new BN(10).pow(await SNTInstance.decimals()))
  ).toString();

  // Set the token BUY and SELL order amounts
  const ETHSell = web3.utils.toWei(new BN(10));
  const TokenBuy = (
    new BN(62750).mul(new BN(10).pow(await SNTInstance.decimals()))
  ).toString();
  const ETHBuy = web3.utils.toWei(new BN(10));
  const TokenSell = (
    new BN(62700).mul(new BN(10).pow(await SNTInstance.decimals()))
  ).toString();

  // Approve the POR contract to spend user's tokens
  await KNCInstance.approve(
    OrderbookReserveInstance.address,
    web3.utils.toWei(new BN(1000000)),
  );
  await SNTInstance.approve(
    OrderbookReserveInstance.address,
    web3.utils.toWei(new BN(1000000)),
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
      { value: web3.utils.toWei(new BN(ETHAmount)) },
    ),
    'depositEther()',
  );

  // Deposit Tokens to POR
  tx(
    await OrderbookReserveInstance.depositToken(
      admin,
      SNTAmount,
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
