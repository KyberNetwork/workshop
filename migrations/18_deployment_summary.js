/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const ConversionRates = artifacts.require('./reserves/fprConversionRates/ConversionRates.sol');
const LiquidityConversionRates = artifacts.require('./reserves/aprConversionRate/LiquidityConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./reserves/KyberReserve.sol');
const AutomatedReserve = artifacts.require('./reserves/KyberAutomatedReserve.sol');
const OrderbookReserve = artifacts.require('./reserves/KyberOrderbookReserve.sol');
const OrderbookReserveLister = artifacts.require('./reserves/orderbookReserve/permissionless/PermissionlessOrderbookReserveLister.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');
const WhiteList = artifacts.require('./WhiteList.sol');
const ExpectedRate = artifacts.require('./ExpectedRate.sol');

const SwapEtherToToken = artifacts.require('./examples/SwapEtherToToken.sol');
const SwapTokenToEther = artifacts.require('./examples/SwapTokenToEther.sol');
const SwapTokenToToken = artifacts.require('./examples/SwapTokenToToken.sol');
const Trade = artifacts.require('./examples/Trade.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');
const SALT = artifacts.require('./mockTokens/Salt.sol');
const ZIL = artifacts.require('./mockTokens/Zilliqa.sol');
const MANA = artifacts.require('./mockTokens/Mana.sol');
const POLY = artifacts.require('./mockTokens/Polymath.sol');
const SNT = artifacts.require('./mockTokens/Status.sol');

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
  console.log(`(admin) ${accounts[0]}`);
  console.log(`(operator) ${accounts[1]}`);
  console.log(`(alerter) ${accounts[2]}`);

  console.log('\n');

  console.log('Wallets');
  console.log('==================');
  console.log(`(user) ${accounts[4]}`);
  console.log(`(reserve) ${accounts[5]}`);
  console.log(`(tax) ${accounts[6]}`);
  Object.keys(networkConfig.feeSharingWallets).forEach((key) => {
    console.log(`(${key}) ${eval(networkConfig.feeSharingWallets[key].wallet)}`);
  });

  console.log('\n');

  console.log('Tokens');
  console.log('==================');
  Object.keys(tokenConfig.FedPriceReserve).forEach((key) => {
    console.log(`(${key}) ${eval(key).address}`);
  });
  Object.keys(tokenConfig.AutomatedPriceReserve).forEach((key) => {
    console.log(`(${key}) ${eval(key).address}`);
  });
  Object.keys(tokenConfig.PermissionedOrderbookReserve).forEach((key) => {
    console.log(`(${key}) ${eval(key).address}`);
  });
  Object.keys(tokenConfig.PermissionlessOrderbookReserve).forEach((key) => {
    console.log(`(${key}) ${eval(key).address}`);
  });

  console.log('\n');

  console.log('Contracts');
  console.log('==================');
  console.log(`(KyberNetwork) ${Network.address}`);
  console.log(`(KyberNetworkProxy) ${NetworkProxy.address}`);
  console.log(`(ConversionRates) ${ConversionRates.address}`);
  console.log(`(LiquidityConversionRates) ${LiquidityConversionRates.address}`);
  console.log(`(SanityRates) ${SanityRates.address}`);
  console.log(`(KyberReserve) ${Reserve.address}`);
  console.log(`(KyberAutomatedReserve) ${AutomatedReserve.address}`);
  console.log(`(KyberOrderbookeserve) ${OrderbookReserve.address}`);
  console.log(`(PermissionlessOrderbookReserveLister) ${OrderbookReserveLister.address}`);
  console.log(`(FeeBurner) ${FeeBurner.address}`);
  console.log(`(WhiteList) ${WhiteList.address}`);
  console.log(`(ExpectedRate) ${ExpectedRate.address}`);
  console.log(`(SwapEtherToToken) ${SwapEtherToToken.address}`);
  console.log(`(SwapTokenToEther) ${SwapTokenToEther.address}`);
  console.log(`(SwapTokenToToken) ${SwapTokenToToken.address}`);
  console.log(`(Trade) ${Trade.address}`);
};
