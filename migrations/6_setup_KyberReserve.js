/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const Network = artifacts.require('./KyberNetwork.sol');
const ConversionRates = artifacts.require('./reserves/fprConversionRates/ConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./reserves/KyberReserve.sol');

const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');
const SALT = artifacts.require('./mockTokens/Salt.sol');
const ZIL = artifacts.require('./mockTokens/Zilliqa.sol');

const tokenConfig = JSON.parse(fs.readFileSync('../config/tokens.json', 'utf8'));

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

  // Set the instances
  const NetworkInstance = await Network.at(Network.address);
  const ReserveInstance = await Reserve.at(Reserve.address);

  // Set the reserve contract addresses
  tx(
    await ReserveInstance.setContracts(
      Network.address,
      ConversionRates.address,
      SanityRates.address,
    ),
    'setContracts()',
  );

  // Add reserve to network
  tx(await NetworkInstance.addReserve(Reserve.address, false, { from: operator }), 'addReserve()');

  Object.keys(tokenConfig.FedPriceReserve).forEach(async (key) => {
    // Add the withdrawal address for each token
    tx(
      await ReserveInstance.approveWithdrawAddress(eval(key).address, reserveWallet, true),
      'approveWithdrawAddress()',
    );

    // List token pairs for the reserve
    tx(
      await NetworkInstance.listPairForReserve(
        Reserve.address,
        eval(key).address,
        true,
        true,
        true,
        { from: operator },
      ),
      'listPairForReserve()',
    );
  });
};
