// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenStakingContract is ERC20, AccessControl {
    uint256 public constant totalTokenSupply = 1_022_000 * 10 ** 18;
    uint256 public constant daylyBatch = 2800 * 10 ** 18;
    uint256 public constant secondsInADay = 86400;
    struct User {
        uint256 amountStaked;
        uint256 lastStakedMatic;
        uint256 rewards;
    }

    // VARIABLES
    uint256 public numberOfStakers;
    uint256 public totalAmountStaked;
    uint256 public lastUpdate; // for the rewards

    mapping(address => uint256) public deletedUserRewards;
    mapping(address => User) public userInfo; // user credentials
    address[] public userIndex; // user indexes (for management)

    // ROLES
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant MATIC_STAKER_ROLE = keccak256("MATIC_STAKER_ROLE");
    bytes32 public constant CLAIMER_ROLE = keccak256("CLAIMER_ROLE");
    bytes32 public constant R_STAKER_ROLE = keccak256("R_STAKER_ROLE");

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
        _mint(msg.sender, totalTokenSupply);
    }

    // EVENTS

    event StakeMatic(uint256 _amount, address _user);
    event UnstakeMatic(uint256 _amount, address _user);

    // FUNCTIONS

    // Calculates the reward for a user using the fromula:
    // (userAmount / totalAmountStaked) * daylyBatch * daysStaked
    function _calculateRewards(address _user) private view returns (uint256) {
        uint256 reward;
        uint256 daysStaked = (block.timestamp - lastUpdate) / secondsInADay;
        reward =
            (userInfo[_user].amountStaked * daylyBatch * daysStaked) /
            totalAmountStaked;
        return reward;
    }

    // This function iterates through the mapping of users and updates their rewards
    // It does not use _calculateRewards for efficiency purposes
    // And it's ment to be called when the totalAmountStaked is changed;
    function _updateRewards() private {
        uint256 daysStaked = (block.timestamp - lastUpdate) / secondsInADay;

        for (uint i = 0; i < numberOfStakers; i++) {
            userInfo[userIndex[i]].rewards +=
                (userInfo[userIndex[i]].amountStaked *
                    daylyBatch *
                    daysStaked) /
                totalAmountStaked;
        }
    }

    // This function deletes a user from the mapping
    function _deleteUser(address _user) private {
        uint256 userToBeDeleted = 0;
        for (uint i = 0; i < numberOfStakers; i++)
            if (userIndex[i] == _user) {
                userToBeDeleted = i;
                break;
            }
        this.revokeRole(MATIC_STAKER_ROLE, userIndex[userToBeDeleted]); // revoke the staker role
        uint256 rewards = userInfo[userIndex[userToBeDeleted]].rewards;
        if (rewards > 0) {
            deletedUserRewards[userIndex[userToBeDeleted]] = rewards; // keep the rewards
            this.grantRole(CLAIMER_ROLE, _user);
        }
        if (userToBeDeleted != numberOfStakers - 1)
            userInfo[userIndex[userToBeDeleted]] = userInfo[
                userIndex[numberOfStakers - 1]
            ];
        delete userInfo[userIndex[numberOfStakers - 1]];
        numberOfStakers--;
    }

    function stakeMatic() external payable {
        require(msg.value > 0, "The value must be a positive number!");
        User memory user = userInfo[msg.sender];
        require(
            (block.timestamp - user.lastStakedMatic) >= secondsInADay,
            "You have to wait 1 day before you can stake!"
        );
        // if the user has the role it is already a staker
        if (!hasRole(MATIC_STAKER_ROLE, msg.sender)) {
            this.grantRole(MATIC_STAKER_ROLE, msg.sender);
            numberOfStakers++;
            userIndex.push(msg.sender);
        }
        user.amountStaked += msg.value;

        if (
            block.timestamp - lastUpdate >= secondsInADay &&
            totalAmountStaked != 0
        ) _updateRewards();

        totalAmountStaked += msg.value;
        user.lastStakedMatic = block.timestamp;
        lastUpdate = block.timestamp;
        userInfo[msg.sender] = user;
        emit StakeMatic(msg.value, msg.sender);
    }

    function unstakeMatic(
        uint256 _amount
    ) external onlyRole(MATIC_STAKER_ROLE) {
        User memory user = userInfo[msg.sender];
        require(user.amountStaked >= _amount, "Insuficient balance!");
        require(_amount > 0, "Nothing to unstake!");
        require(
            (block.timestamp - user.lastStakedMatic) > secondsInADay,
            "You have to wait 1 day before you can unstake!"
        );

        if (block.timestamp - lastUpdate >= secondsInADay) _updateRewards();

        totalAmountStaked -= _amount;
        user.lastStakedMatic = block.timestamp;
        user.amountStaked -= _amount;
        if (user.amountStaked == 0) {
            _deleteUser(msg.sender);
        }
        userInfo[msg.sender] = user;

        (bool sent, ) = msg.sender.call{value: _amount}("");

        require(sent, "Payment failed!");

        emit UnstakeMatic(_amount, msg.sender);
    }

    function stakeR() external {}

    function unstakeR() external {}

    function restakeR() external onlyRole(MATIC_STAKER_ROLE) {}

    function claimRewards() external {
        require(
            hasRole(CLAIMER_ROLE, msg.sender) ||
                hasRole(MATIC_STAKER_ROLE, msg.sender),
            "Not eligible to claim rewards!"
        );

        if (hasRole(CLAIMER_ROLE, msg.sender)) {
            this.revokeRole(CLAIMER_ROLE, msg.sender);
            transfer(msg.sender, deletedUserRewards[msg.sender]);
            delete deletedUserRewards[msg.sender];
        } else {
          uint256 rewards = userInfo[msg.sender].rewards + _calculateRewards(msg.sender);
          userInfo[msg.sender].rewards = 0;
          transfer(msg.sender, rewards);
        }
    }

    function viewRewards()
        external
        view
        onlyRole(MATIC_STAKER_ROLE)
        returns (uint256)
    {
        return (userInfo[msg.sender].rewards + _calculateRewards(msg.sender));
    }

    receive() external payable {}

    // function ViewRewardsPerAmountStaked(uint256 _amount) external view {

    // }
}
