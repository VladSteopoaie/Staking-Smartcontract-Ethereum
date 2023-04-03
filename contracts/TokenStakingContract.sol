// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenStakingContract is ERC20, AccessControl {
  
  uint256 public constant _totalSupply = 1_022_000 * 10 ** 18;
  uint256 public constant _daylyBatch = 2_800 * 10 ** 18;
  struct User {
    uint256 amountStaked;
    uint256 stakeDate;
  }

  // VARIABLES  
  uint256 public numberOfStakers;
  mapping (address => User) public userStakedAmount;

  // ROLES
  //bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
  bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");


  // FUNCTIONS 

  constructor (string memory _name, string memory _symbol) ERC20(_name, _symbol)
  {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function _calculateRewards(address _user) private view returns (uint256 memory) {
    
  }

  function Stake (uint256 _amount) external {

  }

  function Withdraw () external { //modificator de acces

  }

  function ViewRewards() public returns (uint256) { //modificator de acces
    return _calculateRewards(msg.sender);
  }


  function ViewRewardsPerAmountStaked(uint256 _amount) external view {

  }
}
