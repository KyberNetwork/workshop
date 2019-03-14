/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const ConversionRates = artifacts.require('./ConversionRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');

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

  return result.receipt.blockNumber;
}

module.exports = async (deployer, network, accounts) => {
  const { operator } = networkConfig.KyberReserve;
  const tokenAddresses = [];

  // Set the instances
  const ConversionRatesInstance = await ConversionRates.at(ConversionRates.address);

  Object.keys(tokenConfig.FedPriceReserve).forEach(async (key) => {
    // Setup tokenAddresses array for baseBuy and baseSell
    tokenAddresses.push(tokenConfig.FedPriceReserve[key].address);

    // Add the token
    tx(await ConversionRatesInstance.addToken(tokenConfig.FedPriceReserve[key].address), 'addToken()');

    // Set the control info of each token
    tx(
      await ConversionRatesInstance.setTokenControlInfo(
        tokenConfig.FedPriceReserve[key].address,
        tokenConfig.FedPriceReserve[key].minimalRecordResolution,
        tokenConfig.FedPriceReserve[key].maxPerBlockImbalance,
        tokenConfig.FedPriceReserve[key].maxTotalImbalance,
      ),
      'setTokenControlInfo()',
    );

    // Set the quantity step function for each token
    tx(
      await ConversionRatesInstance.setQtyStepFunction(
        tokenConfig.FedPriceReserve[key].address,
        [0],
        [0],
        [0],
        [0],
        { from: operator },
      ),
      'setQtyStepFunction()',
    );

    // Set the imbalance step function for each token
    tx(
      await ConversionRatesInstance.setImbalanceStepFunction(
        tokenConfig.FedPriceReserve[key].address,
        [0],
        [0],
        [0],
        [0],
        { from: operator },
      ),
      'setImbalanceStepFunction()',
    );

    // Enable the token for trading
    tx(await ConversionRatesInstance.enableTokenTrade(eval(key).address), 'enableTokenTrade()');
  });

  // Set the valid duration block of each set rate
  tx(
    await ConversionRatesInstance.setValidRateDurationInBlocks(
      networkConfig.ConversionRates.validDurationBlock,
    ),
    'setValidRateDurationInBlocks()',
  );

  // Set the KyberReserve address
  tx(await ConversionRatesInstance.setReserveAddress(Reserve.address), 'setReserveAddress()');
};
