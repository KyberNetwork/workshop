/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const WhiteList = artifacts.require('./WhiteList.sol');

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
  const userWallet = accounts[4];

  // Set the instances
  const WhiteListInstance = await WhiteList.at(WhiteList.address);

  // Set the SGD rate
  tx(
    await WhiteListInstance.setSgdToEthRate(
      networkConfig.WhiteList.sgdToETHRate,
      { from: operator },
    ),
    'setSgdToEthRate()',
  );

  // Set the default category and caps
  tx(
    await WhiteListInstance.setCategoryCap(
      networkConfig.WhiteList.defaultCategory,
      networkConfig.WhiteList.defaultCap,
      { from: operator },
    ),
    'setCategoryCap()',
  );

  // Set the user category and caps
  tx(
    await WhiteListInstance.setCategoryCap(
      networkConfig.WhiteList.userCategory,
      networkConfig.WhiteList.userCap,
      { from: operator },
    ),
    'setCategoryCap()',
  );
  tx(
    await WhiteListInstance.setUserCategory(
      userWallet,
      networkConfig.WhiteList.userCategory,
      { from: operator },
    ),
    'setUserCategory()',
  );

  // Set the KGT-holder category and cap to 0
  tx(
    await WhiteListInstance.setCategoryCap(
      networkConfig.WhiteList.kgtCategory,
      networkConfig.WhiteList.kgtCap,
      { from: operator },
    ),
    'setCategoryCap()',
  );

  // Set the partner category and caps
  tx(
    await WhiteListInstance.setCategoryCap(
      networkConfig.WhiteList.partnerCategory,
      networkConfig.WhiteList.partnerCap,
      { from: operator },
    ),
    'setCategoryCap()',
  );
  Object.keys(networkConfig.feeSharingWallets).forEach(async (key) => {
    tx(
      await WhiteListInstance.setUserCategory(
        eval(networkConfig.feeSharingWallets[key].wallet),
        networkConfig.WhiteList.partnerCategory,
        { from: operator },
      ),
      'setUserCategory()',
    );
  });
};
