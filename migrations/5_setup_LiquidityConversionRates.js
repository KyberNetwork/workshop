/* global artifacts */
/* eslint-disable no-unused-vars, no-eval, no-underscore-dangle */
const BN = require('bn.js');
const fs = require('fs');

const LiquidityConversionRates = artifacts.require('./LiquidityConversionRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');

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

  return result.receipt.blockNumber;
}

module.exports = async (deployer, network, accounts) => {
  const admin = accounts[0];

  const ReserveInstance = await Reserve.at(Reserve.address);

  // Set the instances
  const LiquidityConversionRatesInstance = await LiquidityConversionRates.at(
    LiquidityConversionRates.address,
  );

  // Set the automated reserve address
  tx(await LiquidityConversionRatesInstance.setReserveAddress(Reserve.address), 'setReserveAddress()');
};
