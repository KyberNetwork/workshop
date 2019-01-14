# Kyber Workshop

This repository is used as complement to the workshops conducted by Kyber. It can also be used to quickly test the Kyber contracts in your local machine.

## Useful Links

1. [Slides](https://docs.google.com/presentation/d/1YllvG5QelqQhpbC-w2UKZoapdQNudmdibrUw3EhCHHk/)
2. [KyberDeveloper Portal](http://developer.kyber.network/)
3. [KyberDeveloper Telegram](https://t.me/KyberDeveloper/)
4. [Workshop Repository](https://github.com/KyberNetwork/workshop/)
5. Ropsten ETH Faucets
   - https://faucet.kyber.network
   - https://faucet.metamask.io
   - https://faucet.ropsten.be
6. [Ropsten KyberSwap](https://ropsten.kyber.network/)

## What is Kyber?
Kyber is a widely used on-chain protocol that makes accessing liquidity simple for users, DApps and financial applications. The protocol has powered decentralised token swaps on popular wallets like MyEtherWallet and imToken, decentralised token payments (users can pay in any supported ERC20 token) in popular DApps like Etheremon and Peepeth and providing an on-chain liquidity source for decentralised financial applications like MelonPort, Set Protocol, b0x and many more.

Kyber protocol brings token inventories and prices on-chain, hence allowing developers to directly embed value exchanges into their smart contracts without any technical or security overhead. This allows for:

- Instant confirmation. A transaction happens with instant confirmation if it's sent from on-chain entities like smart contracts. Otherwise, once the transaction is included on the blockchain, the execution triggered by the transaction is immediately confirmed.

- Operation certainty. There is no transactional risk. Users know the rate and how much liquidity is available before they commit their transaction. There is also no settlement uncertainty or counterparty risk.

- Global and diverse pool of different tokens. Kyber welcomes token holders to contribute their token to the liquidity pool. By having their token made available to the liquidity pool, the token will be available in all services integrated with Kyber.

## Prerequisites

1. Node and NPM LTS versions `10.14.1` and `6.4.1` respectively. Download from [nodejs.org](https://nodejs.org/en/download/)

2. Ganache

Install the Ganache AppImage by downloading here https://truffleframework.com/ganache.
To use the provided Ganache snapshot, install `ganache-cli`.

```
sudo npm install -g ganache-cli
```

3. Truffle

Install the latest Truffle v5.

```
sudo npm install -g truffle@latest
```

Truffle v5.0 is needed in order to take advantage of new features, such as using async/await in the migration scripts. You can read more about the new features in the [Truffle release page](https://github.com/trufflesuite/truffle/releases/tag/v5.0.0)

4. Install the rest of the NPM packages

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
│   │   ├── Status.sol<br />
│   │   └── Zilliqa.sol<br />
│   ├── PermissionGroups.sol<br />
│   ├── permissionless<br />
│   │   ├── OrderbookReserveInterface.sol<br />
│   │   ├── OrderbookReserve.sol<br />
│   │   ├── OrderIdManager.sol<br />
│   │   ├── OrderListFactoryInterface.sol<br />
│   │   ├── OrderListFactory.sol<br />
│   │   ├── OrderListInterface.sol<br />
│   │   ├── OrderList.sol<br />
│   │   └── PermissionlessOrderbookReserveLister.sol<br />
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
│   ├── 15_add_OrderbookReserve.js<br />
│   ├── 16_transfer_tokens.js<br />
│   └── 17_deployment_summary.js<br />
├── package.json<br />
├── README.md<br />
├── scripts<br />
│   ├── get_liquidity_params.py<br />
│   └── liquidity_input_params.json<br />
└── truffle.js<br />

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
cd examples/web3
node <SCRIPT>
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
| ENTITY       | ADDRESS                                    |
| :----------: | :----------------------------------------: |
| **admin**    | 0x2B522cABE9950D1153c26C1b399B293CaA99FcF9 |
| **operator** | 0x3644B986B3F5Ba3cb8D5627A22465942f8E06d09 |
| **alerter**  | 0x9e8f633D0C46ED7170EF3B30E291c64a91a49C7E |


Wallets
==================
| WALLET      | ADDRESS                                    |
| :---------: | :----------------------------------------: |
| **user**    | 0x47a793D7D0AA5727095c3Fe132a6c1A46804c8D2 |
| **reserve** | 0x0d95EBB4874f17157e40635C19dBC6E9b0BFdb03 |
| **tax**     | 0x5243B5970f327c328B2739dEc88abC46FaE8931A |
| **bob**     | 0xe1a1d3637eE02391ac4035e72456Ca7448c73FD4 |
| **alice**   | 0x1cF1919d91cebAb2E56a5c0cC7180bB54eD4f3F6 |


Tokens
==================
| TOKEN    | ADDRESS                                    |
| :------: | :----------------------------------------: |
| **KNC**  | 0x8c13AFB7815f10A8333955854E6ec7503eD841B7 |
| **OMG**  | 0x3750bE154260872270EbA56eEf89E78E6E21C1D9 |
| **SALT** | 0x7ADc6456776Ed1e9661B3CEdF028f41BD319Ea52 |
| **ZIL**  | 0x400DB523AA93053879b20F10F56023b2076aC852 |
| **MANA** | 0xe19Ec968c15f487E96f631Ad9AA54fAE09A67C8c |
| **SNT**  | 0x58A21f7aA3D9D83D0BD8D4aDF589626D13b94b45 |


Contracts
==================
| CONTRACT                                 | ADDRESS                                    |
| :--------------------------------------: | :----------------------------------------: |
| **KyberNetwork**                         | 0x738d8Ef6AcaE15660E467AB2B2cF3a488e40FF64 |
| **KyberNetworkProxy**                    | 0xd44B9352e4Db6d0640449ed653983827BD882885 |
| **ConversionRates**                      | 0xd3add19ee7e5287148a5866784aE3C55bd4E375A |
| **LiquidityConversionRates**             | 0x6E9b241Eec2C4a80485c1D2dF750231AFaf1A167 |
| **SanityRates**                          | 0x8b3BdEcEac3d23A215300A3df19e1bEe43A0Ac9C |
| **KyberReserve**                         | 0xf71D305142eC1aC03896526D52F743959db01624 |
| **AutomatedKyberReserve**                | 0x63D556067eDbCD97ACc3356314398F70d4CcF948 |
| **PermissionlessOrderbookReserveLister** | 0x19F18bde9896890f161DeD31B05b58dc0ffD911b |
| **FeeBurner**                            | 0xdE4e2118f45f1b27699B25004563819B57f5E3b2 |
| **WhiteList**                            | 0x586F3cDCe25E76B69efD1C6Eb6104FAa0760A6a8 |
| **ExpectedRate**                         | 0x295631209354194B6453921bfFeFEe79cD42BdB9 |
| **SwapEtherToToken**                     | 0x5a8665AbbDe3986687494176e22d38B169EA1eab |
| **SwapTokenToEther**                     | 0xB4c927fC102547e4089b02caE5E92d866F63bFE6 |
| **SwapTokenToToken**                     | 0x47bC234Bf1F1436A794DF0a9FcA2935ea384629E |
| **Trade**                                | 0x6aBd125bcc68012197D81a92B4A56307177e0DBD |

**NOTE:** The `KyberReserve` and `AutomatedKyberReserve` are the same contracts. A duplicate was made as a workaround due to a limitation of Truffle where only one instance of a contract can be migrated. Kyber has two types of reserves, manual and automated, which you can read more about [here](https://developer.kyber.network/docs/ReservesUseCase/).

## How to add a new ERC20 token with rates for initial migration

### Manual Reserve

#### 1. Create your ERC20 token contract

Create your ERC20 token contract in `contracts/mockTokens`. You can duplicate any of the existing mock tokens and modify the token name, symbol, and total supply.

#### 2. Set the sanity rate of your token in the network.json config file

In `config/network.json`, under the `SanityRates` section, add the sanity rate of your token. Make sure the identifier is in the format <token symbol>SanityRate (e.g. NEWSanityRate).

You can leave the `reasonableDiff` as is. This field, which is the reasonable conversion rate difference in BPS, means is that any conversion rate outside of this range is considered unreasonable, and will not execute.

```json
"SanityRates": {
  "reasonableDiff": 1000,
  "NEWSanityRate": 1840144285714286
}
```

You can read more about sanity rates [here](https://developer.kyber.network/docs/MiscellaneousGuide/#sanity-rates/).

#### 3. Set the BaseBuy and BaseSell rates of your token in the network.json config file

In `config/network.json`, under the `ConversionRates` section, add the desired conversion rates of your token with respect to ETH. Make sure the identifier is in the format <token symbol>BaseBuy (e.g. NEWBaseBuy) and <token symbol>BaseSell (e.g. NEWBaseSell).

You can leave `validDurationBlock` and `bytes14` as is.

```json
"ConversionRates": {
  "validDurationBlock": 1000000000,
  "bytes14": "0x0000000000000000000000000000",
  "NEWBaseBuy": "500000000000000000000",
  "NEWBaseSell": "2000000000000000"
}
```
You can read more about these fields in the [reserve setup guide](https://developer.kyber.network/docs/ReservesGuide/).

### Automated Reserve

#### 1. Create your ERC20 token contract

Create your ERC20 token contract in `contracts/mockTokens`. You can duplicate any of the existing mock tokens and modify the token name, symbol, and total supply.

#### 2: Defining the network address, permissions, and withdrawal wallet

Modify the file `config/network.json` and specify the addresses for the different properties.

```json
{
  "KyberNetwork": {
    "address": "0xA46E01606f9252fa833131648f4D855549BcE9D9"
  },
  "KyberReserve": {
    "admin": "0x2B522cABE9950D1153c26C1b399B293CaA99FcF9",
    "alerter": "0x9e8f633D0C46ED7170EF3B30E291c64a91a49C7E",
    "operator": "0x3644B986B3F5Ba3cb8D5627A22465942f8E06d09",
    "withdrawWallet": "0x2B522cABE9950D1153c26C1b399B293CaA99FcF9"
  }
}
```

**KyberNetwork**

| Property  | Explanation |
| :-------: | :---------: |
| `address` | Address of the core KyberNetwork contract. |

**KyberReserve**

| Property  | Explanation |
| :-------: | :---------: |
| `admin`   | Wallet address (usually a cold wallet) that handles infrequent, manual operations like calling `setLiquidityParams().` |
| `alerter` | The alerter account is used to halt the operation of the reserve on alerting conditions (e.g. strange conversion rates). In such cases, the reserve operation can be resumed only by the admin account. |
| `operator` | The operator account is used for withdrawing funds from the reserve to certain destinations (e.g. when selling excess tokens in the open market). |
| `withdrawWallet` | Wallet address where the ETH or tokens will be withdrawn to when initiated by the operator. |

We recommend that you use different addresses for the admin, alerter, and operator roles. It is highly recommended that for sensitive contracts like the reserve, a cold wallet is used as the admin wallet. Notice: It is possible to have multiple operators and alerters, but there can only be 1 admin.

The withdrawal wallet address is defined for the token by the admin. Additional withdrawal addresses can be defined using the contract function `approveWithdrawAddress()`. Note that the **token you wish to support must have withdraw addresses**.

#### 3. Defining the liquidity parameters of the token

Modify the file `config/tokens.json` and specify the information for the different properties.

```json
{
  "AutomatedReserve": {
    "Token": {
      "address": "0xe19Ec968c15f487E96f631Ad9AA54fAE09A67C8c",
      "_rInFp": "10995116277",
      "_pMinInFp": "27487790",
      "_numFpBits": "40",
      "_maxCapBuyInWei": "5000000000000000000",
      "_maxCapSellInWei": "5000000000000000000",
      "_feeInBps": "25",
      "_maxTokenToEthRateInPrecision": "100000000000000",
      "_minTokenToEthRateInPrecision": "25000000000000",
      "Ether": "100",
      "Tokens": "2000000",
      "ABI": [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x05d2035b"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x06fdde03"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x18160ddd"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x313ce567"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x40c10f19"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x42966c68"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x66188463"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x70a08231"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x715018a6"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x79cc6790"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x7d64bcb4"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x95d89b41"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa9059cbb"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xd73dd623"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xdd62ed3e"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf2fde38b"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event","signature":"0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event","signature":"0xae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa08"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event","signature":"0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event","signature":"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event","signature":"0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"}]
    }
  }
}
```

**AutomatedReserve.Token**

| Property    | Explanation |
| :---------: | :---------: |
| `address`   | ERC20 token address that will be supported by the automated reserve. |
| `_rInFp`    | r in formula precision, calculated as r * InFp. |
| `_pMinInFp` | Minimum supported price factor in formula precision, calculated as min price factor * initial price of your token * InFp. |
| `_numFpBits` | The formula precision in bits, therefore for formula precision of 2^40, _numFpBits is 40. |
| `_maxCapBuyInWei` | The allowed quantity for one BUY trade in ETH. |
| `_maxCapSellInWei` | The allowed quantity for one SELL trade in ETH. |
| `_feeInBps` | The fee amount in basis points (1 bp = 0.01%) that should be calculated in the price. |
| `_maxTokenToEthRateInPrecision` | The maximum allowed price taking into consideration the maximum supported price factor and must be in 10^18. |
| `_minTokenToEthRateInPrecision` | The minimum allowed price taking into consideration the minimum supported price factor and must be in 10^18. |
| `Ether` | The amount of initial ETH inventory to be deposited into the automated reserve. It is recommended to allocate at least 100 ETH. |
| `Tokens` | The amount of initial token inventory to be deposited into the automated reserve. It is recommended to allocate at least 100 ETH worth of tokens. |
| `ABI` | The ERC20 token's ABI. |
<br />

The function that will be invoked to set liquidity parameters is:

function __setLiquidityParams__(uint \_rInFp, uint \_pMinInFp, uint \_numFpBits, uint \_maxCapBuyInWei, uint \_maxCapSellInWei, uint \_feeInBps, uint \_maxTokenToEthRateInPrecision, uint \_minTokenToEthRateInPrecision) public onlyAdmin

| Type      | Parameter                     |
| :-------: | :---------------------------: |
| `uint`    | _rInFp                        |
| `uint`    | _pMinInFp                     |
| `uint`    | _numFpBits                    |
| `uint`    | _maxCapBuyInWei               |
| `uint`    | _maxCapSellInWei              |
| `uint`    | _feeInBps                     |
| `uint`    | _maxTokenToEthRateInPrecision |
| `uint`    | _minTokenToEthRateInPrecision |

The reserve manager needs to only decide on the initial liquidity parameters of the automated reserve. Specifically, the following information need to be considered and to calculate the parameters above:

1. Liquidity Rate
2. Initial Token Price
3. Initial Ether Amount
4. Initial Token Amount
5. Minimum and Maximum Supported Price Factor
6. Maximum Buy and Maximum Sell Amount in a Trade
7. Fee Percentage

There are several things to take note of in the list of parameters.

First, notice that some parameters will have the **InFp** suffix. InFp refers to formula precision. While this is configurable, 2^40 is the recommended value.

Second, **r** is liquidity the rate in basis points or units of 100 which the price should move each time the ETH/token inventory changes in 1 ETH worth of quantity. For an r of 0.01, the price will move 1%. r is calculated taking into account the amount of initial ETH and tokens deposited into the contract, and the desired minimum/maximum price factor ratio. A smaller r also means more ETH and token inventory is needed to facilitate the liquidity.

For the **minimum/maximum supported price factor ratio**, it is recommended to start with a ratio of 0.5:2.0. This indicates that the inventory will suffice for up to 100% increase or 50% decrease in token price with respect to ETH.


##### Example

Now, Let's assume we want to list a token with the following considerations:

1. Liquidity Rate – 0.01 (1%)
2. Initial Token Price – 1 token = 0.00005 ETH
3. Initial Ether Amount – 100 ETH
4. Initial Token Amount – 2,000,000 tokens (100 ETH worth)
5. Minimum (pMin) and Maximum (pMax) Supported Price Factor – 0.5:2.0
6. Maximum Buy and Maximum Sell Amount in a Trade – 5 ETH max buy and sell cap
7. Fee Percentage – 0.25%

Below, we will calculate the different parameters.

| Parameter          | Formula                                   | Example Value                                            |
| :----------------: | :---------------------------------------: | :------------------------------------------------------: |
| `_rInFp`           | r * InFp                                  | _rInFp = (0.01 * 2^40) = **10995116277**                 |
| `_pMinInFp`        | pMin * initial price of token * InFp      | _pMinInFp = (0.5 * 0.00005 * 2^40) = **27487790**        |
| `_numFpBits`       | InFp in numFpBits                         | _numFpBits = **40**                                      |
| `_maxCapBuyInWei`  | max buy cap * 10^18                       | _maxCapBuyInWei = (5 * 10^18) = **5000000000000000000**  |
| `_maxCapSellInWei` | max sell cap * 10^18                      | _maxCapSellInWei = (5 * 10^18) = **5000000000000000000** |
| `_feeInBps`        | fee percentage in BPS                     | _feeInBps = **25**                                       |
| `_maxTokenToEthRateInPrecision` | pMax * initial price of token * 10^18 | _maxTokenToEthRateInPrecision = (2.0 * 0.00005 * 10^18) = **100000000000000** |
| `_minTokenToEthRateInPrecision` | pMin * initial price of token * 10^18 | _minTokenToEthRateInPrecision = (0.5 * 0.00005 * 10^18) = **25000000000000** |

#### 4. Run the Truffle migration using the command above

With Ganache running, execute:

```
truffle migrate --network development
```
