/* global artifacts, web3 */
/* eslint-disable no-unused-vars */
const BN = require('bn.js');
const fs = require('fs');

const Reserve = artifacts.require('./KyberReserve.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');
const SALT = artifacts.require('./mockTokens/Salt.sol');
const ZIL = artifacts.require('./mockTokens/Zilliqa.sol');

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
}

module.exports = async (deployer, network, accounts) => {
  const admin = accounts[0];
  const userWallet = accounts[4];

  // Set the instances
  const ReserveInstance = await Reserve.at(Reserve.address);
  const KNCInstance = await KNC.at(KNC.address);
  const OMGInstance = await OMG.at(OMG.address);
  const SALTInstance = await SALT.at(SALT.address);
  const ZILInstance = await ZIL.at(ZIL.address);

  // Set token amounts to transfer to user and reserve wallet
  const KNCAmount = (
    new BN(100000).mul(new BN(10).pow(await KNCInstance.decimals()))
  ).toString();
  const OMGAmount = (
    new BN(100000).mul(new BN(10).pow(await OMGInstance.decimals()))
  ).toString();
  const SALTAmount = (
    new BN(100000).mul(new BN(10).pow(await SALTInstance.decimals()))
  ).toString();
  const ZILAmount = (
    new BN(100000).mul(new BN(10).pow(await ZILInstance.decimals()))
  ).toString();

  // Transfer tokens to the user
  tx(await KNCInstance.transfer(userWallet, KNCAmount), 'transfer()');
  tx(await OMGInstance.transfer(userWallet, OMGAmount), 'transfer()');
  tx(await SALTInstance.transfer(userWallet, SALTAmount), 'transfer()');
  tx(await ZILInstance.transfer(userWallet, ZILAmount), 'transfer()');

  // Transfer tokens and ETH to the reserve
  tx(await KNCInstance.transfer(Reserve.address, KNCAmount), 'transfer()');
  tx(await OMGInstance.transfer(Reserve.address, OMGAmount), 'transfer()');
  tx(await SALTInstance.transfer(Reserve.address, SALTAmount), 'transfer()');
  tx(await ZILInstance.transfer(Reserve.address, ZILAmount), 'transfer()');
  tx(
    await ReserveInstance.sendTransaction(
      { from: admin, value: web3.utils.toWei(new BN(50)) },
    ),
    'sendTransaction()',
  );
};
