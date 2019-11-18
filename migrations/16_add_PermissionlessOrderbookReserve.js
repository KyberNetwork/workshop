/* global artifacts, web3 */
/* eslint-disable no-unused-vars, no-eval, no-underscore-dangle */
const BN = require('bn.js');
const fs = require('fs');

const OrderbookReserve = artifacts.require('./reserves/KyberOrderbookReserve.sol');
const OrderbookReserveLister = artifacts.require('./reserves/orderbookReserve/permissionless/PermissionlessOrderbookReserveLister.sol');

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

  let TokenInstance;
  let PORAddress;
  let OrderbookReserveInstance;
  let KNCStake;
  let ETHDeposit;
  let TokenDeposit;
  let ETHSell;
  let TokenBuy;
  let ETHBuy;
  let TokenSell;

  Object.keys(tokenConfig.PermissionlessOrderbookReserve).forEach(async (key) => {
    // Add new permissionless orderbook reserve
    tx(
      await OrderbookReserveListerInstance.addOrderbookContract(
        eval(key).address,
      ),
      'addOrderbookContract()',
    );

    // Initialize the permissionless orderbook reserve`
    tx(
      await OrderbookReserveListerInstance.initOrderbookContract(
        eval(key).address,
      ),
      'initOrderbookContract()',
    );

    // List the permissionless orderbook reserve
    tx(
      await OrderbookReserveListerInstance.listOrderbookContract(
        eval(key).address,
      ),
      'listOrderbookContract()',
    );

    // Get address of POR and set instance
    PORAddress = await OrderbookReserveListerInstance.reserves.call(eval(key).address);
    OrderbookReserveInstance = await OrderbookReserve.at(PORAddress);
    TokenInstance = await eval(key).at(eval(key).address);

    // Set token amounts to transfer
    KNCStake = (
      new BN(
        tokenConfig.PermissionlessOrderbookReserve[key].KNCStake,
      ).mul(new BN(10).pow(await KNCInstance.decimals()))
    ).toString();
    ETHDeposit = web3.utils.toWei(
      new BN(tokenConfig.PermissionlessOrderbookReserve[key].ETHDeposit),
    ).toString();
    TokenDeposit = (
      new BN(
        tokenConfig.PermissionlessOrderbookReserve[key].TokenDeposit,
      ).mul(new BN(10).pow(await TokenInstance.decimals()))
    ).toString();

    // Set the token BUY and SELL order amounts
    ETHSell = web3.utils.toWei(
      new BN(tokenConfig.PermissionlessOrderbookReserve[key].ETHSell),
    ).toString();
    TokenBuy = (
      new BN(
        tokenConfig.PermissionlessOrderbookReserve[key].TokenBuy,
      ).mul(new BN(10).pow(await TokenInstance.decimals()))
    ).toString();
    ETHBuy = web3.utils.toWei(
      new BN(tokenConfig.PermissionlessOrderbookReserve[key].ETHBuy),
    ).toString();
    TokenSell = (
      new BN(
        tokenConfig.PermissionlessOrderbookReserve[key].TokenSell,
      ).mul(new BN(10).pow(await TokenInstance.decimals()))
    ).toString();

    // Approve the POR contract to spend user's tokens
    await KNCInstance.approve(
      OrderbookReserveInstance.address,
      new BN(2).pow(new BN(255)), // approve highest value 2^255
    );
    await TokenInstance.approve(
      OrderbookReserveInstance.address,
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
  });
};
