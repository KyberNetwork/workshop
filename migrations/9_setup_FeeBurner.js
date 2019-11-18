/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const Reserve = artifacts.require('./reserves/KyberReserve.sol');
const AutomatedReserve = artifacts.require('./reserves/KyberAutomatedReserve.sol');
const OrderbookReserve = artifacts.require('./reserves/KyberOrderbookReserve.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));

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
}

module.exports = async (deployer, network, accounts) => {
  const operator = accounts[1];
  const reserveWallet = accounts[5];
  const taxWallet = accounts[6];

  // Set the instances
  const FeeBurnerInstance = await FeeBurner.at(FeeBurner.address);

  // Set the manual reserve data
  tx(
    await FeeBurnerInstance.setReserveData(
      Reserve.address,
      networkConfig.FeeBurner.reserveFees,
      reserveWallet,
      { from: operator },
    ),
    'setReserveData()',
  );

  // Set the automated reserve data
  tx(
    await FeeBurnerInstance.setReserveData(
      AutomatedReserve.address,
      networkConfig.FeeBurner.reserveFees,
      reserveWallet,
      { from: operator },
    ),
    'setReserveData()',
  );

  // Set the orderbook reserve data
  tx(
    await FeeBurnerInstance.setReserveData(
      OrderbookReserve.address,
      networkConfig.FeeBurner.reserveFees,
      reserveWallet,
      { from: operator },
    ),
    'setReserveData()',
  );

  // Set tax fees in base points and tax wallet
  tx(await FeeBurnerInstance.setTaxInBps(networkConfig.FeeBurner.taxFeesBPS), 'setTaxInBps()');
  tx(await FeeBurnerInstance.setTaxWallet(taxWallet), 'setTaxWallet()');

  // Set the wallet fees for each partner
  Object.keys(networkConfig.feeSharingWallets).forEach(async (key) => {
    tx(
      await FeeBurnerInstance.setWalletFees(
        eval(networkConfig.feeSharingWallets[key].wallet),
        networkConfig.feeSharingWallets[key].fees,
      ),
      'setWalletFees()',
    );
  });
};
