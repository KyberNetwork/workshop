/* global artifacts */
/* eslint-disable no-unused-vars */
const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const ConversionRates = artifacts.require('./ConversionRates.sol');
const LiquidityConversionRates = artifacts.require('./LiquidityConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./KyberReserve.sol');
const AutomatedReserve = artifacts.require('./KyberAutomatedReserve.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');
const WhiteList = artifacts.require('./WhiteList.sol');
const ExpectedRate = artifacts.require('./ExpectedRate.sol');
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const KGT = artifacts.require('./mockTokens/KyberGenesisToken.sol');
const SwapEtherToToken = artifacts.require('./examples/SwapEtherToToken.sol');
const SwapTokenToEther = artifacts.require('./examples/SwapTokenToEther.sol');
const SwapTokenToToken = artifacts.require('./examples/SwapTokenToToken.sol');
const Trade = artifacts.require('./examples/Trade.sol');
const MANA = artifacts.require('./mockTokens/Mana.sol');

module.exports = async (deployer, network, accounts) => {
  const admin = accounts[0];

  // Deploy the contracts
  await deployer.deploy(Network, admin);
  await deployer.deploy(NetworkProxy, admin);
  await deployer.deploy(ConversionRates, admin);
  await deployer.deploy(LiquidityConversionRates, admin, MANA.address);
  await deployer.deploy(SanityRates, admin);
  await deployer.deploy(Reserve, Network.address, ConversionRates.address, admin);
  await deployer.deploy(AutomatedReserve, Network.address, LiquidityConversionRates.address, admin);
  await deployer.deploy(FeeBurner, admin, KNC.address, Network.address);
  await deployer.deploy(WhiteList, admin, KGT.address);
  await deployer.deploy(ExpectedRate, Network.address, admin);

  // Deploy the examples
  await deployer.deploy(SwapEtherToToken, NetworkProxy.address);
  await deployer.deploy(SwapTokenToEther, NetworkProxy.address);
  await deployer.deploy(SwapTokenToToken, NetworkProxy.address);
  await deployer.deploy(Trade, NetworkProxy.address);
};
