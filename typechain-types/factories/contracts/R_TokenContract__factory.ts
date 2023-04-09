/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  R_TokenContract,
  R_TokenContractInterface,
} from "../../contracts/R_TokenContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BURNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "HasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002e2a38038062002e2a8339818101604052810190620000379190620003ee565b818181600390816200004a9190620006be565b5080600490816200005c9190620006be565b505050620000746000801b33620000e060201b60201c565b620000a67f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000e060201b60201c565b620000d87f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a84833620000e060201b60201c565b5050620007a5565b620000f28282620000f660201b60201c565b5050565b620001088282620001e860201b60201c565b620001e45760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620001896200025360201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002c48262000279565b810181811067ffffffffffffffff82111715620002e657620002e56200028a565b5b80604052505050565b6000620002fb6200025b565b9050620003098282620002b9565b919050565b600067ffffffffffffffff8211156200032c576200032b6200028a565b5b620003378262000279565b9050602081019050919050565b60005b838110156200036457808201518184015260208101905062000347565b60008484015250505050565b60006200038762000381846200030e565b620002ef565b905082815260208101848484011115620003a657620003a562000274565b5b620003b384828562000344565b509392505050565b600082601f830112620003d357620003d26200026f565b5b8151620003e584826020860162000370565b91505092915050565b6000806040838503121562000408576200040762000265565b5b600083015167ffffffffffffffff8111156200042957620004286200026a565b5b6200043785828601620003bb565b925050602083015167ffffffffffffffff8111156200045b576200045a6200026a565b5b6200046985828601620003bb565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004c657607f821691505b602082108103620004dc57620004db6200047e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005467fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000507565b62000552868362000507565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200059f6200059962000593846200056a565b62000574565b6200056a565b9050919050565b6000819050919050565b620005bb836200057e565b620005d3620005ca82620005a6565b84845462000514565b825550505050565b600090565b620005ea620005db565b620005f7818484620005b0565b505050565b5b818110156200061f5762000613600082620005e0565b600181019050620005fd565b5050565b601f8211156200066e576200063881620004e2565b6200064384620004f7565b8101602085101562000653578190505b6200066b6200066285620004f7565b830182620005fc565b50505b505050565b600082821c905092915050565b6000620006936000198460080262000673565b1980831691505092915050565b6000620006ae838362000680565b9150826002028217905092915050565b620006c98262000473565b67ffffffffffffffff811115620006e557620006e46200028a565b5b620006f18254620004ad565b620006fe82828562000623565b600060209050601f83116001811462000736576000841562000721578287015190505b6200072d8582620006a0565b8655506200079d565b601f1984166200074686620004e2565b60005b82811015620007705784890151825560018201915060208501945060208101905062000749565b868310156200079057848901516200078c601f89168262000680565b8355505b6001600288020188555050505b505050505050565b61267580620007b56000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806340c10f19116100c3578063a457c2d71161007c578063a457c2d7146103c6578063a9059cbb146103f6578063c0f34a3b14610426578063d539139314610456578063d547741f14610474578063dd62ed3e146104905761014d565b806340c10f19146102f257806370a082311461030e57806391d148541461033e57806395d89b411461036e5780639dc29fac1461038c578063a217fddf146103a85761014d565b8063248a9ca311610115578063248a9ca31461021e578063282c51f31461024e5780632f2ff15d1461026c578063313ce5671461028857806336568abe146102a657806339509351146102c25761014d565b806301ffc9a71461015257806306fdde0314610182578063095ea7b3146101a057806318160ddd146101d057806323b872dd146101ee575b600080fd5b61016c60048036038101906101679190611890565b6104c0565b60405161017991906118d8565b60405180910390f35b61018a61053a565b6040516101979190611983565b60405180910390f35b6101ba60048036038101906101b59190611a39565b6105cc565b6040516101c791906118d8565b60405180910390f35b6101d86105ef565b6040516101e59190611a88565b60405180910390f35b61020860048036038101906102039190611aa3565b6105f9565b60405161021591906118d8565b60405180910390f35b61023860048036038101906102339190611b2c565b610628565b6040516102459190611b68565b60405180910390f35b610256610648565b6040516102639190611b68565b60405180910390f35b61028660048036038101906102819190611b83565b61066c565b005b61029061068d565b60405161029d9190611bdf565b60405180910390f35b6102c060048036038101906102bb9190611b83565b610696565b005b6102dc60048036038101906102d79190611a39565b610719565b6040516102e991906118d8565b60405180910390f35b61030c60048036038101906103079190611a39565b610750565b005b61032860048036038101906103239190611bfa565b6107c7565b6040516103359190611a88565b60405180910390f35b61035860048036038101906103539190611b83565b61080f565b60405161036591906118d8565b60405180910390f35b61037661087a565b6040516103839190611983565b60405180910390f35b6103a660048036038101906103a19190611a39565b61090c565b005b6103b0610983565b6040516103bd9190611b68565b60405180910390f35b6103e060048036038101906103db9190611a39565b61098a565b6040516103ed91906118d8565b60405180910390f35b610410600480360381019061040b9190611a39565b610a01565b60405161041d91906118d8565b60405180910390f35b610440600480360381019061043b9190611b83565b610a24565b60405161044d91906118d8565b60405180910390f35b61045e610a38565b60405161046b9190611b68565b60405180910390f35b61048e60048036038101906104899190611b83565b610a5c565b005b6104aa60048036038101906104a59190611c27565b610a7d565b6040516104b79190611a88565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610533575061053282610b04565b5b9050919050565b60606003805461054990611c96565b80601f016020809104026020016040519081016040528092919081815260200182805461057590611c96565b80156105c25780601f10610597576101008083540402835291602001916105c2565b820191906000526020600020905b8154815290600101906020018083116105a557829003601f168201915b5050505050905090565b6000806105d7610b6e565b90506105e4818585610b76565b600191505092915050565b6000600254905090565b600080610604610b6e565b9050610611858285610d3f565b61061c858585610dcb565b60019150509392505050565b600060056000838152602001908152602001600020600101549050919050565b7f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a84881565b61067582610628565b61067e81611041565b6106888383611055565b505050565b60006012905090565b61069e610b6e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461070b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070290611d39565b60405180910390fd5b6107158282611136565b5050565b600080610724610b6e565b90506107458185856107368589610a7d565b6107409190611d88565b610b76565b600191505092915050565b61077a7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63361080f565b6107b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b090611e08565b60405180910390fd5b6107c38282611218565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60606004805461088990611c96565b80601f01602080910402602001604051908101604052809291908181526020018280546108b590611c96565b80156109025780601f106108d757610100808354040283529160200191610902565b820191906000526020600020905b8154815290600101906020018083116108e557829003601f168201915b5050505050905090565b6109367f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a8483361080f565b610975576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096c90611e74565b60405180910390fd5b61097f828261136e565b5050565b6000801b81565b600080610995610b6e565b905060006109a38286610a7d565b9050838110156109e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109df90611f06565b60405180910390fd5b6109f58286868403610b76565b60019250505092915050565b600080610a0c610b6e565b9050610a19818585610dcb565b600191505092915050565b6000610a30838361080f565b905092915050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b610a6582610628565b610a6e81611041565b610a788383611136565b505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610be5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bdc90611f98565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c54576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4b9061202a565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610d329190611a88565b60405180910390a3505050565b6000610d4b8484610a7d565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610dc55781811015610db7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dae90612096565b60405180910390fd5b610dc48484848403610b76565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3190612128565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ea9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ea0906121ba565b60405180910390fd5b610eb483838361153b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610f3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f319061224c565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516110289190611a88565b60405180910390a361103b848484611540565b50505050565b6110528161104d610b6e565b611545565b50565b61105f828261080f565b6111325760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506110d7610b6e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b611140828261080f565b156112145760006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506111b9610b6e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611287576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127e906122b8565b60405180910390fd5b6112936000838361153b565b80600260008282546112a59190611d88565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516113569190611a88565b60405180910390a361136a60008383611540565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036113dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d49061234a565b60405180910390fd5b6113e98260008361153b565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561146f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611466906123dc565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516115229190611a88565b60405180910390a361153683600084611540565b505050565b505050565b505050565b61154f828261080f565b6115c65761155c816115ca565b61156a8360001c60206115f7565b60405160200161157b9291906124d0565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115bd9190611983565b60405180910390fd5b5050565b60606115f08273ffffffffffffffffffffffffffffffffffffffff16601460ff166115f7565b9050919050565b60606000600283600261160a919061250a565b6116149190611d88565b67ffffffffffffffff81111561162d5761162c61254c565b5b6040519080825280601f01601f19166020018201604052801561165f5781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106116975761169661257b565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106116fb576116fa61257b565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000600184600261173b919061250a565b6117459190611d88565b90505b60018111156117e5577f3031323334353637383961626364656600000000000000000000000000000000600f8616601081106117875761178661257b565b5b1a60f81b82828151811061179e5761179d61257b565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806117de906125aa565b9050611748565b5060008414611829576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118209061261f565b60405180910390fd5b8091505092915050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61186d81611838565b811461187857600080fd5b50565b60008135905061188a81611864565b92915050565b6000602082840312156118a6576118a5611833565b5b60006118b48482850161187b565b91505092915050565b60008115159050919050565b6118d2816118bd565b82525050565b60006020820190506118ed60008301846118c9565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561192d578082015181840152602081019050611912565b60008484015250505050565b6000601f19601f8301169050919050565b6000611955826118f3565b61195f81856118fe565b935061196f81856020860161190f565b61197881611939565b840191505092915050565b6000602082019050818103600083015261199d818461194a565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119d0826119a5565b9050919050565b6119e0816119c5565b81146119eb57600080fd5b50565b6000813590506119fd816119d7565b92915050565b6000819050919050565b611a1681611a03565b8114611a2157600080fd5b50565b600081359050611a3381611a0d565b92915050565b60008060408385031215611a5057611a4f611833565b5b6000611a5e858286016119ee565b9250506020611a6f85828601611a24565b9150509250929050565b611a8281611a03565b82525050565b6000602082019050611a9d6000830184611a79565b92915050565b600080600060608486031215611abc57611abb611833565b5b6000611aca868287016119ee565b9350506020611adb868287016119ee565b9250506040611aec86828701611a24565b9150509250925092565b6000819050919050565b611b0981611af6565b8114611b1457600080fd5b50565b600081359050611b2681611b00565b92915050565b600060208284031215611b4257611b41611833565b5b6000611b5084828501611b17565b91505092915050565b611b6281611af6565b82525050565b6000602082019050611b7d6000830184611b59565b92915050565b60008060408385031215611b9a57611b99611833565b5b6000611ba885828601611b17565b9250506020611bb9858286016119ee565b9150509250929050565b600060ff82169050919050565b611bd981611bc3565b82525050565b6000602082019050611bf46000830184611bd0565b92915050565b600060208284031215611c1057611c0f611833565b5b6000611c1e848285016119ee565b91505092915050565b60008060408385031215611c3e57611c3d611833565b5b6000611c4c858286016119ee565b9250506020611c5d858286016119ee565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611cae57607f821691505b602082108103611cc157611cc0611c67565b5b50919050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611d23602f836118fe565b9150611d2e82611cc7565b604082019050919050565b60006020820190508181036000830152611d5281611d16565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611d9382611a03565b9150611d9e83611a03565b9250828201905080821115611db657611db5611d59565b5b92915050565b7f4e6f742061206d696e7465722100000000000000000000000000000000000000600082015250565b6000611df2600d836118fe565b9150611dfd82611dbc565b602082019050919050565b60006020820190508181036000830152611e2181611de5565b9050919050565b7f4e6f742061206275726e65722100000000000000000000000000000000000000600082015250565b6000611e5e600d836118fe565b9150611e6982611e28565b602082019050919050565b60006020820190508181036000830152611e8d81611e51565b9050919050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611ef06025836118fe565b9150611efb82611e94565b604082019050919050565b60006020820190508181036000830152611f1f81611ee3565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611f826024836118fe565b9150611f8d82611f26565b604082019050919050565b60006020820190508181036000830152611fb181611f75565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006120146022836118fe565b915061201f82611fb8565b604082019050919050565b6000602082019050818103600083015261204381612007565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000612080601d836118fe565b915061208b8261204a565b602082019050919050565b600060208201905081810360008301526120af81612073565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006121126025836118fe565b915061211d826120b6565b604082019050919050565b6000602082019050818103600083015261214181612105565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006121a46023836118fe565b91506121af82612148565b604082019050919050565b600060208201905081810360008301526121d381612197565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006122366026836118fe565b9150612241826121da565b604082019050919050565b6000602082019050818103600083015261226581612229565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b60006122a2601f836118fe565b91506122ad8261226c565b602082019050919050565b600060208201905081810360008301526122d181612295565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006123346021836118fe565b915061233f826122d8565b604082019050919050565b6000602082019050818103600083015261236381612327565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b60006123c66022836118fe565b91506123d18261236a565b604082019050919050565b600060208201905081810360008301526123f5816123b9565b9050919050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b600061243d6017836123fc565b915061244882612407565b601782019050919050565b600061245e826118f3565b61246881856123fc565b935061247881856020860161190f565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b60006124ba6011836123fc565b91506124c582612484565b601182019050919050565b60006124db82612430565b91506124e78285612453565b91506124f2826124ad565b91506124fe8284612453565b91508190509392505050565b600061251582611a03565b915061252083611a03565b925082820261252e81611a03565b9150828204841483151761254557612544611d59565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006125b582611a03565b9150600082036125c8576125c7611d59565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b60006126096020836118fe565b9150612614826125d3565b602082019050919050565b60006020820190508181036000830152612638816125fc565b905091905056fea26469706673582212200915b756fde7779540ad88c0f098477b007df19fb5269548ee799d29976f2bb464736f6c63430008120033";

type R_TokenContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: R_TokenContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class R_TokenContract__factory extends ContractFactory {
  constructor(...args: R_TokenContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<R_TokenContract> {
    return super.deploy(
      _name,
      _symbol,
      overrides || {}
    ) as Promise<R_TokenContract>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override attach(address: string): R_TokenContract {
    return super.attach(address) as R_TokenContract;
  }
  override connect(signer: Signer): R_TokenContract__factory {
    return super.connect(signer) as R_TokenContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): R_TokenContractInterface {
    return new utils.Interface(_abi) as R_TokenContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): R_TokenContract {
    return new Contract(address, _abi, signerOrProvider) as R_TokenContract;
  }
}