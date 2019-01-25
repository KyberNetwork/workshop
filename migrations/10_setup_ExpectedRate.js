/* global artifacts */
/* eslint-disable no-unused-vars */
const fs = require('fs');

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

module.exports = async (deployer, network, accounts) => {
  const operator = accounts[1];

  // Set the instances
  const ExpectedRateInstance = await ExpectedRate.at(ExpectedRate.address);

  // Set the worst case rate factor
  tx(
    await ExpectedRateInstance.setWorstCaseRateFactor(
      networkConfig.ExpectedRate.minExpectedRateSlippage,
      { from: operator },
    ),
    'setWorstCaseRateFactor()',
  );

  // Set the quantity factor
  tx(
    await ExpectedRateInstance.setQuantityFactor(
      networkConfig.ExpectedRate.quantityFactor,
      { from: operator },
    ),
    'setQuantityFactor()',
  );
};
