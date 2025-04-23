## 📜 Table of Contents

- [Overview](#-Overview)
- [Smart Contract](#smart-contract)
- [Website](#website)
- [Setup](#setup)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [License](#📄License)

---

## 🧭Overview

**Tea Love** is a decentralized application that allows users to participate in a fun click-based interaction, tracked and ranked on the blockchain. The system records:

- Total number of clicks
- Individual user clicks
- A ranked list of users by clicks

This project includes:

- Solidity smart contract
- Deployment script
- Comprehensive tests
- A frontend website for interaction

---

## 🛠️ Smart Contract

**Contract Name:** `TeaLoveContract`  
[![Solidity Version](https://img.shields.io/badge/Solidity-0.8.26-blue)](https://docs.soliditylang.org/en/v0.8.26/)

## 🌐 Website

[Visit the live DApp](https://tea-love-project.vercel.app/)

Users can connect their wallets and interact directly with the smart contract via a sleek and simple frontend.

---

## ⚙️ Setup

To work with the project locally:

##### Clone the repository

> git clone https://github.com/Ara-miri/Vercel-app.git && cd tea-love-project

##### Install dependencies

> forge install

## 🚀 Getting Started

To deploy the contract and interact locally:

1. Compile the contract:
   > forge build
2. Run a local blockchain (optional):
   > anvil
3. Deploy the contract on local blockchain:
   > forge script src/TeaLoveContract.s.sol --broadcast

Or:

> forge script src/TeaLoveContract.s.sol --rpc-url $YOUR_RPC_URL --private-key $YOUR_PRIVATE_KEY --broadcast

## 🧪 Testing

Run tests:

> forge test

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
