/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const ConversionRates = artifacts.require('./ConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

module.exports = (deployer, network, accounts) => {
  console.log('\n');

  console.log('Network');
  console.log('==================');
  console.log(network);

  console.log('\n');

  console.log('Permissions');
  console.log('==================');
  console.log(`(admin) ${networkConfig.KyberReserve.admin}`);
  console.log(`(operator) ${networkConfig.KyberReserve.operator}`);
  console.log(`(alerter) ${networkConfig.KyberReserve.alerter}`);

  console.log('\n');

  console.log('Wallets');
  console.log('==================');
  console.log(`(withdrawal) ${networkConfig.KyberReserve.withdrawWallet}`);

  console.log('\n');

  console.log('Tokens');
  console.log('==================');
  Object.keys(tokenConfig.FedPriceReserve).forEach((key) => {
    console.log(`(${key}) ${tokenConfig.FedPriceReserve[key].address}`);
  });

  console.log('\n');

  console.log('Contracts');
  console.log('==================');
  console.log(`(ConversionRates) ${ConversionRates.address}`);
  console.log(`(SanityRates) ${SanityRates.address}`);
  console.log(`(KyberReserve) ${Reserve.address}`);
};
