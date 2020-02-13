/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const ConversionRates = artifacts.require('./reserves/fprConversionRates/ConversionRates.sol');
const Reserve = artifacts.require('./reserves/KyberReserve.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');
const SALT = artifacts.require('./mockTokens/Salt.sol');
const ZIL = artifacts.require('./mockTokens/Zilliqa.sol');

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
  const operator = accounts[1];
  const baseBuy = [];
  const baseSell = [];
  const bytes14Buy = [];
  const bytes14Sell = [];
  const tokenAddresses = [];

  // Set the instances
  const ConversionRatesInstance = await ConversionRates.at(ConversionRates.address);

  Object.keys(tokenConfig.FedPriceReserve).forEach(async (key) => {
    // Setup tokenAddresses array for baseBuy and baseSell
    tokenAddresses.push(eval(key).address);

    // Add the token
    tx(await ConversionRatesInstance.addToken(eval(key).address), 'addToken()');

    // Set the control info of each token
    tx(
      await ConversionRatesInstance.setTokenControlInfo(
        eval(key).address,
        tokenConfig.FedPriceReserve[key].minimalRecordResolution,
        tokenConfig.FedPriceReserve[key].maxPerBlockImbalance,
        tokenConfig.FedPriceReserve[key].maxTotalImbalance,
      ),
      'setTokenControlInfo()',
    );

    // Set the quantity step function for each token
    tx(
      await ConversionRatesInstance.setQtyStepFunction(
        eval(key).address,
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
        eval(key).address,
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

  // Set the KyberReserve address and use the txReceipt to get the latest block number
  // for setting the baseRate
  const blockNumber = tx(await ConversionRatesInstance.setReserveAddress(Reserve.address), 'setReserveAddress()');

  // Setup baseBuy and baseSell for setting the baseRate of the listed tokens
  Object.keys(tokenConfig.FedPriceReserve).forEach((key) => {
    baseBuy.push(tokenConfig.FedPriceReserve[key].baseBuy);
    baseSell.push(tokenConfig.FedPriceReserve[key].baseSell);
    bytes14Buy.push(tokenConfig.FedPriceReserve[key].bytes14Buy);
    bytes14Sell.push(tokenConfig.FedPriceReserve[key].bytes14Sell);
  });

  // Set the base rate of each token
  tx(
    await ConversionRatesInstance.setBaseRate(
      tokenAddresses,
      baseBuy,
      baseSell,
      bytes14Buy,
      bytes14Sell,
      blockNumber,
      networkConfig.ConversionRates.indices,
      { from: operator },
    ),
    'setBaseRate()',
  );
};
