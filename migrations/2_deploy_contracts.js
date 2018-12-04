/* global artifacts */
/* eslint-disable no-unused-vars */
const fs = require('fs');

const LiquidityConversionRates = artifacts.require('./LiquidityConversionRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

module.exports = async (deployer, network, accounts) => {
  const { admin } = networkConfig.KyberReserve;
  const kyberNetwork = networkConfig.KyberNetwork.address;
  const token = tokenConfig.AutomatedPriceReserve.Token.address;

  // Deploy the contracts
  await deployer.deploy(LiquidityConversionRates, admin, token);
  await deployer.deploy(Reserve, kyberNetwork, LiquidityConversionRates.address, admin);
};
