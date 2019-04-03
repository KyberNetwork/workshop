#!/usr/bin/env node

// All code examples in this guide have not been audited and should not be used in production.
// If so, it is done at your own risk!

/* eslint-disable no-underscore-dangle, no-unused-vars */

const BN = require('bn.js');
const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');
const moment = require('moment');
const Web3 = require('web3');

process.on('unhandledRejection', console.error.bind(console));

const mnemonic = 'gesture rather obey video awake genuine patient base soon parrot upset lounge';
const rpcUrl = 'http://localhost:8545'; // ganache-cli
const provider = new HDWalletProvider(mnemonic, rpcUrl, 0, 10);
const web3 = new Web3(provider);
const { addresses, wallets } = provider;
const gasPrice = web3.utils.toWei(new BN(10), 'gwei');

const KyberNetworkProxyABI = JSON.parse(fs.readFileSync('./abi/KyberNetworkProxy.abi', 'utf8'));
const KyberNetworkProxyAddress = '0xd3add19ee7e5287148a5866784aE3C55bd4E375A';
const NetworkProxyInstance = new web3.eth.Contract(KyberNetworkProxyABI, KyberNetworkProxyAddress);

const KNC_ADDRESS = '0x8c13AFB7815f10A8333955854E6ec7503eD841B7';
const OMG_ADDRESS = '0x3750bE154260872270EbA56eEf89E78E6E21C1D9';
const MANA_ADDRESS = '0xe19Ec968c15f487E96f631Ad9AA54fAE09A67C8c';
const KNC_ABI = JSON.parse(fs.readFileSync('./abi/KNC.abi', 'utf8'));
const OMG_ABI = JSON.parse(fs.readFileSync('./abi/OMG.abi', 'utf8'));
const MANA_ABI = JSON.parse(fs.readFileSync('./abi/MANA.abi', 'utf8'));
const KNCInstance = new web3.eth.Contract(KNC_ABI, KNC_ADDRESS);
const OMGInstance = new web3.eth.Contract(OMG_ABI, OMG_ADDRESS);
const MANAInstance = new web3.eth.Contract(MANA_ABI, MANA_ADDRESS);

const userWallet = addresses[4];

function stdlog(input) {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${input}`);
}

function tx(result, call) {
  const logs = result.logs.length > 0 ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.transactionHash}`);
  console.log(`   > gas used: ${result.gasUsed}`);
  console.log();
}

async function sendTx(txObject, txTo) {
  const nonce = await web3.eth.getTransactionCount(userWallet);
  const gas = 500 * 1000;

  const txData = txObject.encodeABI();
  const txFrom = userWallet;

  const txParams = {
    from: txFrom,
    to: txTo,
    data: txData,
    value: 0,
    gas,
    nonce,
    chainId: await web3.eth.net.getId(),
    gasPrice,
  };

  const signedTx = await web3.eth.signTransaction(txParams);

  return web3.eth.sendSignedTransaction(signedTx.raw);
}

async function main() {
  let expectedRate;
  let slippageRate;
  let result;
  let txObject;

  NetworkProxyInstance.setProvider(provider);
  KNCInstance.setProvider(provider);
  OMGInstance.setProvider(provider);
  MANAInstance.setProvider(provider);

  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${KyberNetworkProxyAddress})`);

  stdlog(
    `KNC balance of ${userWallet} = ${web3.utils.fromWei(
      await KNCInstance.methods.balanceOf(userWallet).call(),
    )}`,
  );
  stdlog(
    `OMG balance of ${userWallet} = ${web3.utils.fromWei(
      await OMGInstance.methods.balanceOf(userWallet).call(),
    )}`,
  );
  stdlog(
    `MANA balance of ${userWallet} = ${web3.utils.fromWei(
      await MANAInstance.methods.balanceOf(userWallet).call(),
    )}`,
  );

  // Approve the KyberNetwork contract to spend user's tokens
  txObject = KNCInstance.methods.approve(KyberNetworkProxyAddress, web3.utils.toWei('10000'));
  await sendTx(txObject, KNC_ADDRESS);

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.methods
    .getExpectedRate(
      KNC_ADDRESS, // srcToken
      OMG_ADDRESS, // destToken
      web3.utils.toWei('100'), // srcQty
    )
    .call());

  txObject = NetworkProxyInstance.methods.swapTokenToToken(
    KNC_ADDRESS, // srcToken
    web3.utils.toWei('100'), // srcAmount
    OMG_ADDRESS, // destToken
    expectedRate, // minConversionRate
  );
  result = await sendTx(txObject, KyberNetworkProxyAddress);
  tx(result, 'KNC <-> OMG swapTokenToEther()');

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.methods
    .getExpectedRate(
      KNC_ADDRESS, // srcToken
      MANA_ADDRESS, // destToken
      web3.utils.toWei('100'), // srcQty
    )
    .call());

  txObject = NetworkProxyInstance.methods.swapTokenToToken(
    KNC_ADDRESS, // srcToken
    web3.utils.toWei('100'), // srcAmount
    MANA_ADDRESS, // destToken
    expectedRate, // minConversionRate
  );
  result = await sendTx(txObject, KyberNetworkProxyAddress);
  tx(result, 'KNC <-> MANA swapTokenToEther()');

  stdlog(
    `KNC balance of ${userWallet} = ${web3.utils.fromWei(
      await KNCInstance.methods.balanceOf(userWallet).call(),
    )}`,
  );
  stdlog(
    `OMG balance of ${userWallet} = ${web3.utils.fromWei(
      await OMGInstance.methods.balanceOf(userWallet).call(),
    )}`,
  );
  stdlog(
    `MANA balance of ${userWallet} = ${web3.utils.fromWei(
      await MANAInstance.methods.balanceOf(userWallet).call(),
    )}`,
  );

  stdlog('- END -');
}

// Start the script
main();
