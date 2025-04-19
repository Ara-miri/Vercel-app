// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract TeaLoveContract {
    struct UserStats {
        address user;
        uint256 clicks;
    }

    uint256 public totalClicks;
    mapping(address => uint256) public userClicks;
    address[] public users;
    mapping(address => bool) public hasClicked;
    address private owner;

    event Clicked(
        address indexed user,
        uint256 totalClicks,
        uint256 userClicks
    );

    constructor() {
        owner = msg.sender;
    }

    function click() external {
        totalClicks++;
        userClicks[msg.sender]++;

        if (!hasClicked[msg.sender]) {
            hasClicked[msg.sender] = true;
            users.push(msg.sender);
        }

        emit Clicked(msg.sender, totalClicks, userClicks[msg.sender]);
    }

    function _sortUsers(UserStats[] memory arr) internal pure {
        for (uint256 i = 0; i < arr.length; i++) {
            for (uint256 j = i + 1; j < arr.length; j++) {
                if (arr[i].clicks < arr[j].clicks) {
                    UserStats memory temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }

    function getAllUsers() external view returns (address[] memory) {
        return users;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getSortedUsers() external view returns (UserStats[] memory) {
        UserStats[] memory userStats = new UserStats[](users.length);

        // Create array of UserStats
        for (uint256 i = 0; i < users.length; i++) {
            userStats[i] = UserStats({
                user: users[i],
                clicks: userClicks[users[i]]
            });
        }

        // Sort the array
        _sortUsers(userStats);

        return userStats;
    }
}
