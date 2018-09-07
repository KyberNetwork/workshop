/* global artifacts, web3 */
/* eslint-disable no-underscore-dangle, no-unused-vars */
const BN = require('bn.js');
const moment = require('moment');

const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');

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
  const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

  // Set the instances
  const NetworkProxyInstance = await NetworkProxy.at(NetworkProxy.address);
  const KNCInstance = await KNC.at(KNC.address);

  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${NetworkProxy.address})`);

  stdlog(`KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.balanceOf(userWallet))}`);
  stdlog(`ETH balance of ${userWallet} = ${web3.utils.fromWei(await web3.eth.getBalance(userWallet))}`);

  // Approve the KyberNetwork contract to spend user's tokens
  await KNCInstance.approve(
    NetworkProxy.address,
    web3.utils.toWei(new BN(10000)),
    { from: userWallet },
  );

  const { expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    KNC.address, // srcToken
    ETH_ADDRESS, // destToken
    web3.utils.toWei(new BN(50)), // srcQty
  );

  const result = await NetworkProxyInstance.swapTokenToEther(
    KNC.address, // srcToken
    web3.utils.toWei(new BN(50)), // srcAmount
    expectedRate, // minConversionRate
    { from: userWallet },
  );
  tx(result, 'KNC <-> ETH swapTokenToEther()');

  stdlog(`KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.balanceOf(userWallet))}`);
  stdlog(`ETH balance of ${userWallet} = ${web3.utils.fromWei(await web3.eth.getBalance(userWallet))}`);

  stdlog('- END -');
  callback();
};
