// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {TeaLoveContract} from "../src/TeaLoveContract.sol";

contract TeaLoveProjectTest is Test {
    TeaLoveContract public tealove;

    address public owner = address(this);
    address user1 = address(0x1);
    address user2 = address(0x2);
    address user3 = address(0x3);
    address[] public topUsers;

    event Clicked(
        address indexed user,
        uint256 totalClicks,
        uint256 userClicks
    );

    function setUp() public {
        tealove = new TeaLoveContract();
    }

    function test_InitialState() public view {
        assertEq(tealove.getOwner(), owner);
        assertEq(tealove.totalClicks(), 0);
        assertEq(tealove.getAllUsers().length, 0);
    }

    function test_ClickIncrementsCounts() public {
        vm.prank(user1);
        tealove.click();

        assertEq(tealove.totalClicks(), 1);
        assertEq(tealove.userClicks(user1), 1);
        assertTrue(tealove.hasClicked(user1));
        assertEq(tealove.getAllUsers().length, 1);
    }

    function test_MultipleClicksSameUser() public {
        vm.startPrank(user1);
        tealove.click();
        tealove.click();
        tealove.click();
        vm.stopPrank();

        assertEq(tealove.totalClicks(), 3);
        assertEq(tealove.userClicks(user1), 3);
        assertEq(tealove.getAllUsers().length, 1);
    }

    function test_MultipleUsers() public {
        vm.prank(user1);
        tealove.click();

        vm.startPrank(user2);
        for (uint i = 0; i < 2; i++) {
            tealove.click();
        }
        vm.stopPrank();
        assertEq(tealove.totalClicks(), 3);
        assertEq(tealove.userClicks(user1), 1);
        assertEq(tealove.userClicks(user2), 2);
        assertEq(tealove.getAllUsers().length, 2);
    }

    function test_GetAllUsers() public {
        vm.prank(user1);
        tealove.click();

        vm.prank(user2);
        tealove.click();

        address[] memory users = tealove.getAllUsers();
        assertEq(users.length, 2);
        assertEq(users[0], user1);
        assertEq(users[1], user2);
    }

    function test_SortingFunction() public {
        // user1: 3 clicks
        vm.startPrank(user1);
        for (uint i = 0; i < 3; i++) {
            tealove.click();
        }
        vm.stopPrank();

        // user2: 5 clicks
        vm.startPrank(user2);
        for (uint i = 0; i < 5; i++) {
            tealove.click();
        }
        vm.stopPrank();

        // user3: 1 click
        vm.prank(user3);
        tealove.click();

        TeaLoveContract.UserStats[] memory sorted = tealove.getSortedUsers();

        assertEq(sorted.length, 3);
        assertEq(sorted[0].user, user2);
        assertEq(sorted[0].clicks, 5);
        assertEq(sorted[1].user, user1);
        assertEq(sorted[1].clicks, 3);
        assertEq(sorted[2].user, user3);
        assertEq(sorted[2].clicks, 1);
    }

    function test_EqualClicksSorting() public {
        vm.prank(user1);
        tealove.click();

        vm.prank(user2);
        tealove.click();

        TeaLoveContract.UserStats[] memory sorted = tealove.getSortedUsers();

        // Should maintain insertion order when clicks are equal
        assertEq(sorted[0].user, user1);
        assertEq(sorted[1].user, user2);
    }

    function test_EmptySortedUsers() public view {
        TeaLoveContract.UserStats[] memory sorted = tealove.getSortedUsers();
        assertEq(sorted.length, 0);
    }

    // Test new user not in hasClicked mapping
    function test_NewUserNotInHasClicked() public view {
        assertFalse(tealove.hasClicked(user1));
    }

    function test_ClickEventEmitted() public {
        vm.expectEmit(true, true, true, true);
        emit Clicked(user1, 1, 1);

        vm.prank(user1);
        tealove.click();
    }
}
