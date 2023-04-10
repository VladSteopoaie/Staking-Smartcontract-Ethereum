// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenStakingContract is ERC20, AccessControl {
    uint256 public constant totalTokenSupply = 1_022_000 * 10 ** 18;
    uint256 public constant daylyBatch = 2800 * 10 ** 18;
    uint256 public constant secondsInADay = 86400;
    uint256 public constant maxStakeAmount = 1000 * 10 ** 18;
    struct User {
        uint256 amountStaked;
        uint256 lastStakedMatic;
        uint256 rewards;
        uint256 lastClaimedRewards;
    }

    // VARIABLES
    uint256 public numberOfStakers;
    uint256 public totalAmountStaked;
    uint256 public lastUpdate; // for the rewards

    mapping(address => uint256) public deletedUserRewards; // this is to keep the rewards for 
														   // the users who are no longer stakers
    mapping(address => User) public userInfo; // user credentials
    address[] public userIndex; // user indexes (for management)

    // ROLES
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant MATIC_STAKER_ROLE = keccak256("MATIC_STAKER_ROLE");
    bytes32 public constant CLAIMER_ROLE = keccak256("CLAIMER_ROLE");

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
        _mint(address(this), totalTokenSupply);
    }

    // EVENTS

    event StakeMatic(uint256 _amount, address _user);
    event UnstakeMatic(uint256 _amount, address _user);
    event ClaimRewards(uint256 _amount, address _user);

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
    // And it's ment to be called when the totalAmountStaked is changed
    function _updateRewards() private {
        uint256 daysStaked = (block.timestamp - lastUpdate) / secondsInADay;

        for (uint i = 0; i < numberOfStakers; i++) {
			// if the user claimed rewards after the last update the number of days
			// is given by lastClaimedRewards
            if (userInfo[userIndex[i]].lastClaimedRewards > lastUpdate) {
                daysStaked =
                    (block.timestamp -
                        userInfo[userIndex[i]].lastClaimedRewards) /
                    secondsInADay;
            }
            userInfo[userIndex[i]].rewards +=
                (userInfo[userIndex[i]].amountStaked *
                    daylyBatch *
                    daysStaked) /
                totalAmountStaked;
        }
    }

    // This function deletes a user from the mapping
    function _deleteUser(address _user) private {
        uint256 userToBeDeleted = 0; // used to identify the user
        for (uint i = 0; i < numberOfStakers; i++)
            if (userIndex[i] == _user) {
                userToBeDeleted = i;
                break;
            }
		
        this.revokeRole(MATIC_STAKER_ROLE, userIndex[userToBeDeleted]); // revoke the staker role
        uint256 rewards = userInfo[userIndex[userToBeDeleted]].rewards;
        // if there are no rewards we don't need to give the user any special permission
		if (rewards > 0) {
            deletedUserRewards[userIndex[userToBeDeleted]] = rewards; // keep the rewards
            this.grantRole(CLAIMER_ROLE, _user);
        }
		// if the user is not the last one in the mapping, swap with the last one
        if (userToBeDeleted != numberOfStakers - 1)
            userInfo[userIndex[userToBeDeleted]] = userInfo[
                userIndex[numberOfStakers - 1]
            ];
		// delete the last user
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

        require(
            totalAmountStaked + msg.value <= maxStakeAmount,
            "The maximum staked amount has been exeeded!"
        );
        // if the user has the role it is already a staker
        if (!hasRole(MATIC_STAKER_ROLE, msg.sender)) {
            this.grantRole(MATIC_STAKER_ROLE, msg.sender);
            numberOfStakers++;
            userIndex.push(msg.sender);
        }
        user.amountStaked += msg.value;

        if ( // this condition is to avoid division by 0 for the first staker
            block.timestamp - lastUpdate >= secondsInADay &&
            totalAmountStaked != 0
        ) _updateRewards(); // the totalAmountStaked is going to change so we need to update
							// the rewards before that


        totalAmountStaked += msg.value;
        user.lastStakedMatic = block.timestamp;
        user.lastClaimedRewards = block.timestamp;
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

		// need to firstly update so the user won't loose the rewards
        if (block.timestamp - lastUpdate >= secondsInADay) _updateRewards();

        totalAmountStaked -= _amount;
        user.lastStakedMatic = block.timestamp;
        user.amountStaked -= _amount;
		// if the user unstaked all tokens then we delete them from the mapping
        if (user.amountStaked == 0) {
            _deleteUser(msg.sender);
        } else {
            userInfo[msg.sender] = user;
        }
        (bool sent, ) = msg.sender.call{value: _amount}("");

        require(sent, "Payment failed!");

        emit UnstakeMatic(_amount, msg.sender);
    }

    function claimRewards() external {
        // the user has to be a staker or a claimer in order to claim rewards
		require(
            hasRole(CLAIMER_ROLE, msg.sender) ||
                hasRole(MATIC_STAKER_ROLE, msg.sender),
            "Not eligible to claim rewards!"
        );

        uint256 rewards; // for simplicity
        
		if (hasRole(CLAIMER_ROLE, msg.sender)) {
			// if they are a claimer then they have been deleted so 
			// their rewards are in deletedUserRewards mapping
            this.revokeRole(CLAIMER_ROLE, msg.sender);
            rewards = deletedUserRewards[msg.sender];
            delete deletedUserRewards[msg.sender];
        } else {
			// the number of days staked differs if the user had claimed rewards before an update
            if (userInfo[msg.sender].lastClaimedRewards > lastUpdate) {
                uint256 daysStaked = (block.timestamp -
                    userInfo[msg.sender].lastClaimedRewards) / secondsInADay;
                rewards =
                    (userInfo[msg.sender].amountStaked *
                        daylyBatch *
                        daysStaked) /
                    totalAmountStaked;
            } else {
                rewards =
                    userInfo[msg.sender].rewards +
                    _calculateRewards(msg.sender);
            }
            userInfo[msg.sender].rewards = 0;
			// this stops the user from abusing the claimRewards function if they are a staker
            require(rewards > 0, "No rewards to claim!");
        }

        userInfo[msg.sender].lastClaimedRewards = block.timestamp;

        this.transfer(msg.sender, rewards);

        emit ClaimRewards(rewards, msg.sender);
    }

	// just a function for users to see their rewards
    function viewRewards() external view returns (uint256) { 
        require(
            hasRole(CLAIMER_ROLE, msg.sender) ||
                hasRole(MATIC_STAKER_ROLE, msg.sender),
            "Not eligible to view rewards!"
        );
        return (userInfo[msg.sender].rewards + _calculateRewards(msg.sender));
    }

    receive() external payable {}
}
