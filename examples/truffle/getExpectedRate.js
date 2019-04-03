// All code examples in this guide have not been audited and should not be used in production.
// If so, it is done at your own risk!

/* global artifacts, web3 */
/* eslint-disable no-underscore-dangle */
const BN = require('bn.js');
const moment = require('moment');

const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');
const MANA = artifacts.require('./mockTokens/Mana.sol');
const POLY = artifacts.require('./mockTokens/Polymath.sol');
const SNT = artifacts.require('./mockTokens/Status.sol');

function stdlog(input) {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${input}`);
}

module.exports = async (callback) => {
  const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  let expectedRate;
  let slippageRate;

  // Set the instances
  const NetworkProxyInstance = await NetworkProxy.at(NetworkProxy.address);

  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${NetworkProxy.address})`);

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    ETH_ADDRESS, // srcToken
    KNC.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `ETH <-> KNC getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    KNC.address, // srcToken
    ETH_ADDRESS, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `KNC <-> ETH getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    KNC.address, // srcToken
    OMG.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `KNC <-> OMG getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    ETH_ADDRESS, // srcToken
    MANA.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `ETH <-> MANA getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    MANA.address, // srcToken
    ETH_ADDRESS, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `MANA <-> ETH getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    MANA.address, // srcToken
    KNC.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `MANA <-> KNC getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    ETH_ADDRESS, // srcToken
    POLY.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `ETH <-> POLY getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    POLY.address, // srcToken
    ETH_ADDRESS, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `POLY <-> ETH getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    POLY.address, // srcToken
    KNC.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `POLY <-> KNC getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    ETH_ADDRESS, // srcToken
    SNT.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `ETH <-> SNT getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    SNT.address, // srcToken
    ETH_ADDRESS, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `SNT <-> ETH getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    SNT.address, // srcToken
    KNC.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));
  stdlog(
    `SNT <-> KNC getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`,
  );

  stdlog('- END -');
  callback();
};
