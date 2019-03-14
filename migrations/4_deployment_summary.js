/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const OrderbookReserve = artifacts.require('./KyberOrderbookReserve.sol');

module.exports = (deployer, network, accounts) => {
  console.log('\n');

  console.log('Network');
  console.log('==================');
  console.log(network);

  console.log('\n');

  console.log('Contracts');
  console.log('==================');
  console.log(`(KyberOrderbookeserve) ${OrderbookReserve.address}`);
};
