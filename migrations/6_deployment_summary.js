/* global artifacts */
/* eslint-disable no-unused-vars, no-eval, no-underscore-dangle */
const fs = require('fs');

const LiquidityConversionRates = artifacts.require('./LiquidityConversionRates.sol');
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
  console.log(`(operators) ${networkConfig.KyberReserve.operators}`);
  console.log(`(alerters) ${networkConfig.KyberReserve.alerters}`);

  console.log('\n');

  console.log('Wallets');
  console.log('==================');
  console.log(`(withdrawal) ${networkConfig.KyberReserve.withdrawWallet}`);

  console.log('\n');

  console.log('Token');
  console.log('==================');
  console.log(`(address) ${tokenConfig.AutomatedPriceReserve.Token.address}`);

  console.log('\n');

  console.log('Contracts');
  console.log('==================');
  console.log(`(LiquidityConversionRates) ${LiquidityConversionRates.address}`);
  console.log(`(KyberReserve) ${Reserve.address}`);
};
