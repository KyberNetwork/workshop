#!/usr/bin/env node
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
const KyberNetworkProxyAddress = '0xA46E01606f9252fa833131648f4D855549BcE9D9';
const NetworkProxyInstance = new web3.eth.Contract(KyberNetworkProxyABI, KyberNetworkProxyAddress);

const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const KNC_ADDRESS = '0x8c13AFB7815f10A8333955854E6ec7503eD841B7';
const KNC_ABI = JSON.parse(fs.readFileSync('./abi/KNC.abi', 'utf8'));
const KNCInstance = new web3.eth.Contract(KNC_ABI, KNC_ADDRESS);

const userWallet = addresses[4];

function stdlog(input) {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${input}`);
}

function tx(result, call) {
  const logs = (result.logs.length > 0) ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.transactionHash}`);
  console.log(`   > gas used: ${result.gasUsed}`);
  console.log();
}

async function sendTx(txObject) {
  const nonce = await web3.eth.getTransactionCount(userWallet);
  const gas = 500 * 1000;

  const txData = txObject.encodeABI();
  const txFrom = userWallet;
  const txTo = txObject._parent.options.address;
  const txKey = wallets[userWallet]._privKey;

  const txParams = {
    from: txFrom,
    to: txTo,
    data: txData,
    value: web3.utils.toWei(new BN(1)),
    gas,
    nonce,
    chainId: await web3.eth.net.getId(),
    gasPrice,
  };

  const signedTx = await web3.eth.signTransaction(txParams);

  return web3.eth.sendSignedTransaction(signedTx.raw);
}

async function main() {
  NetworkProxyInstance.setProvider(provider);
  KNCInstance.setProvider(provider);

  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${KyberNetworkProxyAddress})`);

  stdlog(`ETH balance of ${userWallet} = ${web3.utils.fromWei(await web3.eth.getBalance(userWallet))}`);
  stdlog(`KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.methods.balanceOf(userWallet).call())}`);

  const { expectedRate, slippageRate } = await NetworkProxyInstance.methods.getExpectedRate(
    ETH_ADDRESS, // srcToken
    KNC_ADDRESS, // destToken
    web3.utils.toWei(new BN(1)), // srcQty
  ).call();

  const txObject = NetworkProxyInstance.methods.swapEtherToToken(
    KNC_ADDRESS, // destToken
    expectedRate, // minConversionRate
  );
  const result = await sendTx(txObject);
  tx(result, 'ETH <-> KNC swapEtherToToken()');

  stdlog(`ETH balance of ${userWallet} = ${web3.utils.fromWei(await web3.eth.getBalance(userWallet))}`);
  stdlog(`KNC balance of ${userWallet} = ${web3.utils.fromWei(await KNCInstance.methods.balanceOf(userWallet).call())}`);

  stdlog('- END -');
}

// Start the script
main();
