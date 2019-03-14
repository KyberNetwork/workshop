/* global artifacts */
/* eslint-disable */
const BN = require('bn.js');
const fs = require('fs');

const OrderbookReserve = artifacts.require('./KyberOrderbookReserve.sol');
const OrderListFactory = artifacts.require('./permissionless/OrderListFactory.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

module.exports = async (deployer, network, accounts) => {
  // Deploy the contracts
  await deployer.deploy(OrderListFactory);
  await deployer.deploy(
    OrderbookReserve,
    networkConfig.OrderbookReserve.KNC,
    networkConfig.OrderbookReserve.Token,
    networkConfig.OrderbookReserve.FeeBurner,
    networkConfig.KyberNetwork.address,
    networkConfig.OrderbookReserve.Medianizer,
    OrderListFactory.address,
    tokenConfig.PermissionedOrderbookReserve.Token.minNewOrderUsd,
    tokenConfig.PermissionedOrderbookReserve.Token.maxOrdersPerTrade,
    tokenConfig.PermissionedOrderbookReserve.Token.burnFeeBps,
  );
};
