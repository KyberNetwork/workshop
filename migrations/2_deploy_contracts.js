/* global artifacts */
/* eslint-disable */
const BN = require('bn.js');
const fs = require('fs');

const ConversionRates = artifacts.require('./ConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

module.exports = async (deployer, network, accounts) => {
  const { admin } = networkConfig.KyberReserve;
  const kyberNetwork = networkConfig.KyberNetwork.address;

  // Deploy the contracts
  await deployer.deploy(ConversionRates, admin);
  await deployer.deploy(SanityRates, admin);
  await deployer.deploy(Reserve, kyberNetwork, ConversionRates.address, admin);
};
