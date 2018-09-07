/* global artifacts */
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const KGT = artifacts.require('./mockTokens/KyberGenesisToken.sol');
const OMG = artifacts.require('./mockTokens/OmiseGo.sol');
const SALT = artifacts.require('./mockTokens/Salt.sol');
const ZIL = artifacts.require('./mockTokens/Zilliqa.sol');

module.exports = async (deployer) => {
  // Deploy the tokens
  await deployer.deploy(KNC);
  await deployer.deploy(KGT);
  await deployer.deploy(OMG);
  await deployer.deploy(SALT);
  await deployer.deploy(ZIL);
};
