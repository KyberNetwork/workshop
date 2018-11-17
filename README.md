# Kyber Workshop

This repository is used as complement to the workshops conducted by Kyber. It can also be used to quickly test the Kyber contracts in your local machine.

## Useful Links

1. [Slides](https://docs.google.com/presentation/d/1UhnFoHKOdAuyuwN3BVj1pzmxAdIifPgs7QWt9OOi1pM/)
2. [KyberDeveloper Portal](http://developer.kyber.network)
3. [KyberDeveloper Telegram](https://t.me/KyberDeveloper)
4. [Workshop Repository](https://github.com/KyberNetwork/workshop)
5. Ropsten ETH Faucets
   - https://faucet.kyber.network
   - https://faucet.metamask.io
   - https://faucet.ropsten.be
6. [Ropsten KyberSwap](https://ropsten.kyber.network)

## What is Kyber?
Kyber is a widely used on-chain protocol that makes accessing liquidity simple for users, DApps and financial applications. The protocol has powered decentralised token swaps on popular wallets like MyEtherWallet and imToken, decentralised token payments (users can pay in any supported ERC20 token) in popular DApps like Etheremon and Peepeth and providing an on-chain liquidity source for decentralised financial applications like MelonPort, Set Protocol, b0x and many more.

Kyber protocol brings token inventories and prices on-chain, hence allowing developers to directly embed value exchanges into their smart contracts without any technical or security overhead. This allows for:

- Instant confirmation. A transaction happens with instant confirmation if it's sent from on-chain entities like smart contracts. Otherwise, once the transaction is included on the blockchain, the execution triggered by the transaction is immediately confirmed.

- Operation certainty. There is no transactional risk. Users know the rate and how much liquidity is available before they commit their transaction. There is also no settlement uncertainty or counterparty risk.

- Global and diverse pool of different tokens. Kyber welcomes token holders to contribute their token to the liquidity pool. By having their token made available to the liquidity pool, the token will be available in all services integrated with Kyber.

## Prerequisites

1. Ganache

Install the Ganache AppImage by downloading here https://truffleframework.com/ganache.
To use the provided Ganache snapshot, install `ganache-cli`.

```
sudo npm install -g ganache-cli
```

2. Truffle

Install the latest Truffle v5 beta.

```
sudo npm install -g truffle@beta
```

3. Install the rest of the NPM packages

```
npm install
```

## Workshop Repository

### Overview

workshop<br />
├── config<br />
│   ├── network.json<br />
│   └── tokens.json<br />
├── contracts<br />
│   ├── ConversionRatesInterface.sol<br />
│   ├── ConversionRates.sol<br />
│   ├── ERC20Interface.sol<br />
│   ├── examples<br />
│   │   ├── SwapEtherToToken.sol<br />
│   │   ├── SwapTokenToEther.sol<br />
│   │   └── SwapTokenToToken.sol<br />
│   │   └── Trade.sol<br />
│   ├── ExpectedRateInterface.sol<br />
│   ├── ExpectedRate.sol<br />
│   ├── FeeBurnerInterface.sol<br />
│   ├── FeeBurner.sol<br />
│   ├── KyberNetworkInterface.sol<br />
│   ├── KyberNetworkProxyInterface.sol<br />
│   ├── KyberNetworkProxy.sol<br />
│   ├── KyberNetwork.sol<br />
│   ├── KyberReserveInterface.sol<br />
│   ├── KyberReserve.sol<br />
│   ├── LiquidityConversionRates.sol<br />
│   ├── LiquidityFormula.sol<br />
│   ├── Migrations.sol<br />
│   ├── mockTokens<br />
│   │   ├── KyberGenesisToken.sol<br />
│   │   ├── KyberNetworkCrystal.sol<br />
│   │   ├── Mana.sol<br />
│   │   ├── OmiseGo.sol<br />
│   │   ├── Salt.sol<br />
│   │   └── Zilliqa.sol<br />
│   ├── PermissionGroups.sol<br />
│   ├── SanityRatesInterface.sol<br />
│   ├── SanityRates.sol<br />
│   ├── SimpleNetworkInterface.sol<br />
│   ├── Utils2.sol<br />
│   ├── Utils.sol<br />
│   ├── VolumeImbalanceRecorder.sol<br />
│   ├── WhiteListInterface.sol<br />
│   ├── WhiteList.sol<br />
│   └── Withdrawable.sol<br />
├── db<br />
├── examples<br />
│   ├── solidity<br />
│   │   ├── SwapEtherToToken.sol -> ../../contracts/examples/SwapEtherToToken.sol<br />
│   │   ├── SwapTokenToEther.sol -> ../../contracts/examples/SwapTokenToEther.sol<br />
│   │   └── SwapTokenToToken.sol -> ../../contracts/examples/SwapTokenToToken.sol<br />
│   │   └── Trade.sol -> ../../contracts/examples/Trade.sol<br />
│   ├── truffle<br />
│   │   ├── getExpectedRate.js<br />
│   │   ├── swapEtherToToken.js<br />
│   │   ├── swapTokenToEther.js<br />
│   │   ├── swapTokenToToken.js<br />
│   │   └── trade.js<br />
│   └── web3<br />
│       ├── abi<br />
│       │   ├── KyberNetworkProxy.abi<br />
│       │   ├── KNC.abi<br />
│       │   ├── OMG.abi<br />
│       │   ├── MANA.abi<br />
│       │   ├── SALT.abi<br />
│       │   └── ZIL.abi<br />
│       ├── getExpectedRate.js<br />
│       ├── swapEtherToToken.js<br />
│       ├── swapTokenToEther.js<br />
│       └── swapTokenToToken.js<br />
├── LICENSE<br />
├── migrations<br />
│   ├── 1_initial_migration.js<br />
│   ├── 2_deploy_tokens.js<br />
│   ├── 3_deploy_contracts.js<br />
│   ├── 4_setup_permissions.js<br />
│   ├── 5_setup_KyberNetworkProxy.js<br />
│   ├── 6_setup_KyberReserve.js<br />
│   ├── 7_setup_KyberAutomatedReserve.js<br />
│   ├── 8_setup_FeeBurner.js<br />
│   ├── 9_setup_ExpectedRate.js<br />
│   ├── 10_setup_ConversionRates.js<br />
│   ├── 11_setup_LiquidityConversionRates.js<br />
│   ├── 12_setup_SanityRates.js<br />
│   ├── 13_setup_WhiteList.js<br />
│   ├── 14_setup_KyberNetwork.js<br />
│   ├── 15_transfer_tokens.js<br />
│   └── 16_deployment_summary.js<br />
├── package.json<br />
├── README.md<br />
├── test<br />
└── truffle.js

### Directory Details

**config** - contains JSON files that hold configuration details of the Kyber contracts used for migrations<br />
**contracts** - contains all the Kyber contracts, plus some mock tokens and solidity examples for testing<br />
**examples** - contains truffle and web3 example scripts to interact with Kyber's smart contracts, and also contains solidity examples for Kyber contract interactions<br />
**migrations** - contains the truffle migration scripts to deploy and setup the Kyber contracts in a test environment

## Interacting with the Kyber contracts locally

### 1A. Run Ganache with local snapshot

A Ganache snapshot has already been pre-made with the Kyber contracts deployed. You can immediately interact with the contracts without having to do migrations. The snapshot is stored in `db` folder.

We use the mnemonic `gesture rather obey video awake genuine patient base soon parrot upset lounge` for the accounts. The user wallet (`0x47a793D7D0AA5727095c3Fe132a6c1A46804c8D2`) already contains some ETH and test ERC20 tokens.

**NOTE:** The mnemonic provided is used only for testing. DO NOT use the accounts generated for your own personal use in mainnet, as you can potentially lose those funds.

To run the snapshot locally, run the command:

```sh
ganache-cli --db db --accounts 10 --defaultBalanceEther 500 --mnemonic 'gesture rather obey video awake genuine patient base soon parrot upset lounge' --networkId 5777 --debug
```

### 1B. Run Ganache and deploy the Kyber contracts from scratch

If you wish to deploy the Kyber contracts yourself, you can run the following commands:

Run ganache-cli in one terminal session
```
ganache-cli --accounts 10 --defaultBalanceEther 500 --mnemonic 'gesture rather obey video awake genuine patient base soon parrot upset lounge' --networkId 5777 --debug
```

In a new terminal session, connect to the ganache network, and run the truffle migration scripts
```
truffle migrate --network development
```

### 2. Running the example scripts

You can directly interact with the Kyber contracts on the Ganache network. We have provided some example scripts in the `example` directory.

For the Truffle examples:
```
truffle exec examples/truffle/<SCRIPT>
```

e.g.
```
truffle exec examples/truffle/swapEtherToToken.js
```

For the Web3 examples:
```
node examples/web3/<SCRIPT>
```

e.g.
```
node examples/web3/swapEtherToToken.js
```

For the Solidity examples, they are already deployed in the Ganache network using the Truffle migration scripts. You can interact with the Solidity examples using `truffle console`, or write your own Truffle/Web3 scripts to interact with the Solidity example contracts.

### Ganache network details

Network
==================
development


Permissions
==================
(**admin**) 0x2B522cABE9950D1153c26C1b399B293CaA99FcF9<br />
(**operator**) 0x3644B986B3F5Ba3cb8D5627A22465942f8E06d09<br />
(**alerter**) 0x9e8f633D0C46ED7170EF3B30E291c64a91a49C7E


Wallets
==================
(**user**) 0x47a793D7D0AA5727095c3Fe132a6c1A46804c8D2<br />
(**reserve**) 0x0d95EBB4874f17157e40635C19dBC6E9b0BFdb03<br />
(**tax**) 0x5243B5970f327c328B2739dEc88abC46FaE8931A<br />
(**bob**) 0xe1a1d3637eE02391ac4035e72456Ca7448c73FD4<br />
(**alice**) 0x1cF1919d91cebAb2E56a5c0cC7180bB54eD4f3F6


Tokens
==================
(**KNC**) 0x8c13AFB7815f10A8333955854E6ec7503eD841B7<br />
(**OMG**) 0x3750bE154260872270EbA56eEf89E78E6E21C1D9<br />
(**SALT**) 0x7ADc6456776Ed1e9661B3CEdF028f41BD319Ea52<br />
(**ZIL**) 0x400DB523AA93053879b20F10F56023b2076aC852<br />
(**MANA**) 0xe19Ec968c15f487E96f631Ad9AA54fAE09A67C8c


Contracts
==================
(**KyberNetwork**) 0xA46E01606f9252fa833131648f4D855549BcE9D9<br />
(**KyberNetworkProxy**) 0xF6084Ad447076da0246cD28e104533f9f51dbD2F<br />
(**ConversionRates**) 0x738d8Ef6AcaE15660E467AB2B2cF3a488e40FF64<br />
(**LiquidityConversionRates**) 0xd44B9352e4Db6d0640449ed653983827BD882885<br />
(**SanityRates**) 0xd3add19ee7e5287148a5866784aE3C55bd4E375A<br />
(**KyberReserve**) 0x6E9b241Eec2C4a80485c1D2dF750231AFaf1A167<br />
(**AutomatedKyberReserve**) 0x8b3BdEcEac3d23A215300A3df19e1bEe43A0Ac9C<br />
(**FeeBurner**) 0xf71D305142eC1aC03896526D52F743959db01624<br />
(**WhiteList**) 0x63D556067eDbCD97ACc3356314398F70d4CcF948<br />
(**ExpectedRate**) 0xE16d27F08e94D9d6f05C988169E388068C790B75<br />
(**SwapEtherToToken**) 0x19F18bde9896890f161DeD31B05b58dc0ffD911b<br />
(**SwapTokenToEther**) 0xdE4e2118f45f1b27699B25004563819B57f5E3b2<br />
(**SwapTokenToToken**) 0x586F3cDCe25E76B69efD1C6Eb6104FAa0760A6a8<br />
(**Trade**) 0x295631209354194B6453921bfFeFEe79cD42BdB9

**NOTE:** The `KyberReserve` and `AutomatedKyberReserve` are the same contracts. A duplicate was made as a workaround due to a limitation of Truffle where only one instance of a contract can be migrated.
