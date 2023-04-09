// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./R_TokenContract.sol";


contract TokenStakingContract is ERC20, AccessControl {
  
  uint256 public constant totalTokenSupply = 1_022_000 * 10 ** 18;
  uint256 public constant daylyBatch = 2_800 * 10 ** 18;
  struct User {
    uint256 amountStaked;
    uint256 lastStakeDate;
    uint256 rewards;
  }

  // VARIABLES  
  uint256 public numberOfStakers;
  uint256 public totalAmountStaked;
  mapping (address => User) public userInfo;
  // ROLES
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
  bytes32 public constant MATIC_STAKER_ROLE = keccak256("MATIC_STAKER_ROLE");
  bytes32 public constant R_STAKER_ROLE = keccak256("R_STAKER_ROLE");

  constructor (string memory _name, string memory _symbol) ERC20(_name, _symbol)
  {
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
    uint256 daysStaked = block.timestamp - userInfo[_user].lastStakeDate;
    reward = (userInfo[_user].amountStaked / totalAmountStaked)
      * daylyBatch * daysStaked;
    return reward;
  }

  function stakeMatic () external payable{
    require(msg.value > 0, "The value must be a positive number!");
    
    User memory user = userInfo[msg.sender];
    if (hasRole(MATIC_STAKER_ROLE, msg.sender)) {
      user.rewards += _calculateRewards(msg.sender);
    }
    else {
      this.grantRole(MATIC_STAKER_ROLE, msg.sender);
      numberOfStakers ++;
    }
    user.amountStaked += msg.value;
    user.lastStakeDate = block.timestamp;
    totalAmountStaked += msg.value;
    userInfo[msg.sender] = user;
    emit StakeMatic(msg.value, msg.sender);
  }

  function unstakeMatic (uint256 _amount) external onlyRole(MATIC_STAKER_ROLE) {
    User memory user = userInfo[msg.sender];
    require (user.amountStaked > _amount, "Insuficient balance!");
    require (user.amountStaked > 0, "No token staked!");
    require (_amount > 0, "Nothing to unstake!");

    totalAmountStaked -= _amount;
    user.rewards += _calculateRewards(msg.sender);
    user.lastStakeDate = block.timestamp; 
    user.amountStaked -= _amount;

    userInfo[msg.sender] = user;

    (bool sent, ) = msg.sender.call{value: _amount}("");

    require (sent, "Payment failed!");

    emit UnstakeMatic(_amount, msg.sender);

  }

  function stakeR() external {
    
  }

  function unstakeR()  external {
    
  }

  function restakeR () external onlyRole(MATIC_STAKER_ROLE) {
    
  }


  function claimRewards() external onlyRole(MATIC_STAKER_ROLE) {

  }



  function viewRewards() public view onlyRole(MATIC_STAKER_ROLE) returns (uint256) {
    return userInfo[msg.sender].rewards + _calculateRewards(msg.sender);
  }

  receive() external payable {}

  // function ViewRewardsPerAmountStaked(uint256 _amount) external view {

  // }
}
