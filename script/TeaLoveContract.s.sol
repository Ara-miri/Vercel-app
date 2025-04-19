// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {TeaLoveContract} from "../src/TeaLoveContract.sol";

contract DeployTLV is Script {
    function run() external {
        vm.startBroadcast();
        new TeaLoveContract();

        vm.stopBroadcast();
    }
}
