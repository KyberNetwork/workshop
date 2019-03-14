/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const SanityRates = artifacts.require('./SanityRates.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

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
  const { operator } = networkConfig.KyberReserve;
  const reasonableDiffs = [];
  const tokens = [];

  // Set the instances
  const SanityRatesInstance = await SanityRates.at(SanityRates.address);

  // Set the input arrays
  Object.keys(tokenConfig.FedPriceReserve).forEach((key) => {
    reasonableDiffs.push(networkConfig.SanityRates.reasonableDiff);
    tokens.push(tokenConfig.FedPriceReserve[key].address);
  });

  // Setup the reasonable diffs for all tokens
  tx(
    await SanityRatesInstance.setReasonableDiff(
      tokens,
      reasonableDiffs,
    ),
    'setReasonableDiff()',
  );
};
