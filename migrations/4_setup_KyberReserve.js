/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const ConversionRates = artifacts.require('./reserves/PFR/ConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const Reserve = artifacts.require('./reserves/KyberReserve.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));
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
  const { withdrawWallets } = networkConfig.KyberReserve;
  const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

  // Set the instances
  const ReserveInstance = await Reserve.at(Reserve.address);

  // Set the reserve contract addresses
  tx(
    await ReserveInstance.setContracts(
      networkConfig.KyberNetwork.address,
      ConversionRates.address,
      SanityRates.address,
    ),
    'setContracts()',
  );

  Object.keys(tokenConfig.FedPriceReserve).forEach(async (key) => {
    for (index in withdrawWallets) {
      // Add the withdrawal address for the token
      tx(
        await ReserveInstance.approveWithdrawAddress(
          tokenConfig.FedPriceReserve[key].address,
          withdrawWallets[index],
          true,
        ),
        'approveWithdrawAddress()',
      );
    
      // Add the withdrawal address for ETH
      tx(
        await ReserveInstance.approveWithdrawAddress(
          ETH_ADDRESS,
          withdrawWallets[index],
          true,
        ),
        'approveWithdrawAddress()',
      );
    }
  });
};
