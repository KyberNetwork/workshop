/* global artifacts */
/* eslint-disable */
const BN = require('bn.js');
const fs = require('fs');

const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const ConversionRates = artifacts.require('./reserves/fprConversionRates/ConversionRates.sol');
const LiquidityConversionRates = artifacts.require('./reserves/aprConversionRate/LiquidityConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./reserves/KyberReserve.sol');
const AutomatedReserve = artifacts.require('./reserves/KyberAutomatedReserve.sol');
const OrderbookReserve = artifacts.require('./reserves/KyberOrderbookReserve.sol');
const OrderListFactory = artifacts.require('./reserves/orderbookReserve/permissionless/OrderListFactory.sol');
const OrderbookReserveLister = artifacts.require('./reserves/orderbookReserve/permissionless/PermissionlessOrderbookReserveLister.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');
const WhiteList = artifacts.require('./WhiteList.sol');
const ExpectedRate = artifacts.require('./ExpectedRate.sol');
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const KGT = artifacts.require('./mockTokens/KyberGenesisToken.sol');
const MANA = artifacts.require('./mockTokens/Mana.sol');
const POLY = artifacts.require('./mockTokens/Polymath.sol');
const MockMedianizer = artifacts.require('./mockContracts/MockMedianizer.sol');
const SwapEtherToToken = artifacts.require('./examples/SwapEtherToToken.sol');
const SwapTokenToEther = artifacts.require('./examples/SwapTokenToEther.sol');
const SwapTokenToToken = artifacts.require('./examples/SwapTokenToToken.sol');
const Trade = artifacts.require('./examples/Trade.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

module.exports = async (deployer, network, accounts) => {
  const admin = accounts[0];
  const kncRate = new BN(networkConfig.FeeBurner.kncRate).mul(new BN(10).pow(new BN(18)));
  const dollarsPerETH = new BN(
    networkConfig.MockMedianizer.DollarPerETH,
  ).mul(new BN(10).pow(new BN(18)));

  // Deploy the mock contracts
  await deployer.deploy(MockMedianizer, dollarsPerETH);

  // Deploy the contracts
  await deployer.deploy(Network, admin);
  await deployer.deploy(NetworkProxy, admin);
  await deployer.deploy(ConversionRates, admin);
  await deployer.deploy(LiquidityConversionRates, admin, MANA.address);
  await deployer.deploy(SanityRates, admin);
  await deployer.deploy(FeeBurner, admin, KNC.address, Network.address, kncRate);
  await deployer.deploy(OrderListFactory);
  await deployer.deploy(Reserve, Network.address, ConversionRates.address, admin);
  await deployer.deploy(AutomatedReserve, Network.address, LiquidityConversionRates.address, admin);
  await deployer.deploy(
    OrderbookReserve,
    KNC.address,
    POLY.address,
    FeeBurner.address,
    Network.address,
    MockMedianizer.address,
    OrderListFactory.address,
    tokenConfig.PermissionedOrderbookReserve.POLY.minNewOrderUsd,
    tokenConfig.PermissionedOrderbookReserve.POLY.maxOrdersPerTrade,
    tokenConfig.PermissionedOrderbookReserve.POLY.burnFeeBps,
  );
  await deployer.deploy(
    OrderbookReserveLister,
    Network.address,
    OrderListFactory.address,
    MockMedianizer.address,
    KNC.address,
    networkConfig.PermissionlessOrderbookReserveLister.unsupportedTokens,
    networkConfig.PermissionlessOrderbookReserveLister.maxOrdersPerTrade,
    networkConfig.PermissionlessOrderbookReserveLister.minOrderValueUsd,
  );
  await deployer.deploy(WhiteList, admin, KGT.address);
  await deployer.deploy(ExpectedRate, Network.address, KNC.address, admin);

  // Deploy the examples
  await deployer.deploy(SwapEtherToToken, NetworkProxy.address);
  await deployer.deploy(SwapTokenToEther, NetworkProxy.address);
  await deployer.deploy(SwapTokenToToken, NetworkProxy.address);
  await deployer.deploy(Trade, NetworkProxy.address);
};
