/* global artifacts */
/* eslint-disable no-unused-vars, no-eval, no-underscore-dangle */
const BN = require('bn.js');
const fs = require('fs');

const OrderbookReserve = artifacts.require('./KyberOrderbookReserve.sol');

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
  // Set the instances
  const OrderbookReserveInstance = await OrderbookReserve.at(OrderbookReserve.address);

  // Initialize the permissioned orderbook reserve`
  tx(
    await OrderbookReserveInstance.init(),
    'init()',
  );
};
