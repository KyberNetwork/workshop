/* global artifacts, web3 */
/* eslint-disable no-underscore-dangle, no-unused-vars */
const BN = require('bn.js');
const moment = require('moment');

const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');

function stdlog(input) {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${input}`);
}

function tx(result, call) {
  const logs = (result.logs.length > 0) ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.tx}`);
  console.log(`   > contract address: ${logs.address}`);
  console.log(`   > gas used: ${result.receipt.gasUsed}`);
  console.log(`   > event: ${logs.event}`);
  console.log();
}

module.exports = async (callback) => {
  const accounts = web3.eth.accounts._provider.addresses;
  const userWallet = accounts[4];

  // Set the instances
  const NetworkProxyInstance = await NetworkProxy.at(NetworkProxy.address);
  const KNCInstance = await KNC.at(KNC.address);
  const OMGInstance = await OMG.at(OMG.address);

  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${NetworkProxy.address})`);

  stdlog(`KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.balanceOf(userWallet))}`);
  stdlog(`OMG balance of ${userWallet} = ${web3.utils.fromWei(await OMGInstance.balanceOf(userWallet))}`);

  // Approve the KyberNetwork contract to spend user's tokens
  await KNCInstance.approve(
    NetworkProxy.address,
    web3.utils.toWei(new BN(100000)),
    { from: userWallet },
  );

  const { expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    KNC.address, // srcToken
    OMG.address, // destToken
    1, // srcQty
  );

  const result = await NetworkProxyInstance.trade(
    KNC.address, // srcToken
    web3.utils.toWei(new BN(10)), // srcAmount
    OMG.address, // destToken
    userWallet, // destAddress
    web3.utils.toWei(new BN(100000)), // maxDestAmount
    expectedRate, // minConversionRate
    0, // walletId
    { from: userWallet },
  );
  tx(result, 'KNC <-> OMG trade()');

  stdlog(`KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.balanceOf(userWallet))}`);
  stdlog(`OMG balance of ${userWallet} = ${web3.utils.fromWei(await OMGInstance.balanceOf(userWallet))}`);

  stdlog('- END -');
  callback();
};
