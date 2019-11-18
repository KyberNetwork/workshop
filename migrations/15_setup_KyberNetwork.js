/* global artifacts */
/* eslint-disable no-unused-vars */
const fs = require('fs');

const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const Reserve = artifacts.require('./reserves/KyberReserve.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');
const WhiteList = artifacts.require('./WhiteList.sol');
const ExpectedRate = artifacts.require('./ExpectedRate.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));

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

module.exports = async (deployer) => {
  // Set the instances
  const NetworkInstance = await Network.at(Network.address);

  // Setup the contract addresses of the network
  tx(await NetworkInstance.setKyberProxy(NetworkProxy.address), 'setKyberProxy()');
  tx(await NetworkInstance.setFeeBurner(FeeBurner.address), 'setFeeBurner()');
  tx(await NetworkInstance.setWhiteList(WhiteList.address), 'setWhiteList');
  tx(await NetworkInstance.setExpectedRate(ExpectedRate.address), 'setExpectedRate');

  // Setup network parameters
  tx(
    await NetworkInstance.setParams(
      networkConfig.KyberNetwork.maxGasPrice,
      networkConfig.KyberNetwork.negDiffInBPS,
    ),
    'setParams()',
  );

  // Enable the network for swapping
  tx(await NetworkInstance.setEnable(true), 'setEnable()');
};
