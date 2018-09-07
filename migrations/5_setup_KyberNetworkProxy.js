/* global artifacts */
/* eslint-disable no-unused-vars */
const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');

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
  const NetworkProxyInstance = await NetworkProxy.at(NetworkProxy.address);

  // Link the main KyberNetwork contract to the proxy contract
  tx(await NetworkProxyInstance.setKyberNetworkContract(Network.address), 'setKyberNetworkContract()');
};
