// All code examples in this guide have not been audited and should not be used in production.
// If so, it is done at your own risk!

/* global artifacts, web3 */
/* eslint-disable no-underscore-dangle, no-unused-vars */
const BN = require('bn.js');
const moment = require('moment');

const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const MANA = artifacts.require('./mockTokens/Mana.sol');

function stdlog(input) {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${input}`);
}

function tx(result, call) {
  const logs = result.logs.length > 0 ? result.logs[0] : { address: null, event: null };

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
  let expectedRate;
  let slippageRate;
  let result;

  // Set the instances
  const NetworkProxyInstance = await NetworkProxy.at(NetworkProxy.address);
  const KNCInstance = await KNC.at(KNC.address);
  const MANAInstance = await MANA.at(MANA.address);

  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${NetworkProxy.address})`);

  stdlog(
    `ETH balance of ${userWallet} = ${web3.utils.fromWei(await web3.eth.getBalance(userWallet))}`,
  );
  stdlog(
    `KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.balanceOf(userWallet))}`,
  );
  stdlog(
    `MANA balance of ${userWallet} = ${web3.utils.fromWei(
      await MANAInstance.balanceOf(userWallet),
    )}`,
  );

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    ETH_ADDRESS, // srcToken
    KNC.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));

  result = await NetworkProxyInstance.swapEtherToToken(
    KNC.address, // destToken
    expectedRate, // minConversionRate
    { from: userWallet, value: web3.utils.toWei(new BN(1)) },
  );
  tx(result, 'ETH <-> KNC swapEtherToToken()');

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.getExpectedRate(
    ETH_ADDRESS, // srcToken
    MANA.address, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ));

  result = await NetworkProxyInstance.swapEtherToToken(
    MANA.address, // destToken
    expectedRate, // minConversionRate
    { from: userWallet, value: web3.utils.toWei(new BN(1)) },
  );
  tx(result, 'ETH <-> MANA swapEtherToToken()');

  stdlog(
    `ETH balance of ${userWallet} = ${web3.utils.fromWei(await web3.eth.getBalance(userWallet))}`,
  );
  stdlog(
    `KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.balanceOf(userWallet))}`,
  );
  stdlog(
    `MANA balance of ${userWallet} = ${web3.utils.fromWei(
      await MANAInstance.balanceOf(userWallet),
    )}`,
  );

  stdlog('- END -');
  callback();
};
