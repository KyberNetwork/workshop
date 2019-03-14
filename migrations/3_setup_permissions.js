/* global artifacts */
/* eslint-disable no-unused-vars */
const fs = require('fs');

const ConversionRates = artifacts.require('./ConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');

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
  const { alerter, operator } = networkConfig.KyberReserve;

  // Set the instances
  const ConversionRatesInstance = await ConversionRates.at(ConversionRates.address);
  const SanityRatesInstance = await SanityRates.at(SanityRates.address);
  const ReserveInstance = await Reserve.at(Reserve.address);

  // Set permissions of contracts
  tx(await ConversionRatesInstance.addOperator(operator), 'addOperator()');
  tx(await ReserveInstance.addOperator(operator), 'addOperator()');
  tx(await ReserveInstance.addAlerter(alerter), 'addAlerter()');
  tx(await SanityRatesInstance.addOperator(operator), 'addOperator()');
};
