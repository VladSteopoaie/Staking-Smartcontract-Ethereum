// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenStakingContract is ERC20, AccessControl {
  
  uint256 public constant totalTokenSupply = 1_022_000 * 10 ** 18;
  uint256 public constant daylyBatch = 2_800 * 10 ** 18;
  struct User {
    uint256 amountStaked;
    uint256 stakeDate;
    uint256 lastClaimedRewardsDate;
  }

  // VARIABLES  
  uint256 public numberOfStakers;
  uint256 public totalAmountStaked;
  mapping (address => User) public userInfo;

  // ROLES
  //bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
  bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");


  // FUNCTIONS 

  constructor (string memory _name, string memory _symbol) ERC20(_name, _symbol)
  {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _mint(msg.sender, totalTokenSupply);
  }

  // Calculates the reward for a user using the fromula:
  // (userAmount / totalAmountStaked) * daylyBatch * daysStaked
  function _calculateRewards(address _user) private view returns (uint256) {
    uint256 reward;
    uint256 daysStaked = block.timestamp - userInfo[_user].lastClaimedRewardsDate;
    reward = (userInfo[_user].amountStaked / totalAmountStaked)
      * daylyBatch * daysStaked;
    return reward;
  }

  function Stake (uint256 _amount) external payable{

  }

  function Unstake () external { //modificator de acces

  }

  function ClaimRewards() external { //modificator

  }

  function ViewRewards() public view returns (uint256) { //modificator de acces
    return _calculateRewards(msg.sender);
  }


  function ViewRewardsPerAmountStaked(uint256 _amount) external view {

  }
}
