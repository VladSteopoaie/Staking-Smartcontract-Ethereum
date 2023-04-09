// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// 1 MATIC = 3 R_TOKEN

contract R_TokenContract is ERC20, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
  constructor(
      string memory _name,
      string memory _symbol
  ) ERC20(_name, _symbol) {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    _setupRole(BURNER_ROLE, msg.sender);
    
  }

  function mint(address to, uint256 amount) external 
  {
    require(hasRole(MINTER_ROLE, msg.sender), "Not a minter!");
    _mint(to, amount);
  }

  function burn(address from, uint256 amount) external {
    require(hasRole(BURNER_ROLE, msg.sender), "Not a burner!");
    _burn(from, amount);
  }

  function HasRole(bytes32 role, address account) public view returns (bool) {
        return hasRole(role, account);
  }
}

