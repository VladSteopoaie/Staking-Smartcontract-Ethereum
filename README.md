# Staking smart contract on Ethereum (Polygon Mumbai network)

The smart contract can be found at this address: 0xfE3588B753762bae12Dc5BAEcEB6F4569c6a571B

## Short description

- The staking contract generates 1.022.000 R_TOKENs which will be distributed as rewards over time in dayly batches of 2.800 tokens
- The token that can be staked is MATIC and the reward is in R_TOKEN
- There are 4 public functionalities in this contract:
  - Stake MATIC (send MATIC to the smart contract and rewards will be generated dayly)
  - Unstake MATIC (receive the amount of MATIC mentioned as a parameter of the function, the rewards are stored in the contract)
  - Claim rewards (rewards can be claimed by the staker or ex-staker of the contract)
  - View rewards (rewards can be caluclated and viewed by the user)
 - The maximum amount that can be staked is 1000 MATIC tokens
 - There is a cooldown of one day between any stake or unstake functionality
 - The user is allowed to unstake all tokens and then claim the rewards

## Technical details
- Dayly distribution is managed as follows:
  - All users rewards are calculated an updated whenever the total amount of staked tokens in the smart contract changes (this assures the users that the rewards are distributed correctly)
  - The rewards are also calculated acknowledging the time the rewards were last claimed by the user (again for correct distribution)
  - The updated rewards are calculated using private functions
- User management is done using a mapping of user addressed to a struct with the following properties 
  - amountStaked
  - lastStakedMatic (the last time the user performed a staker or an unstake, used for the cooldown in stake and unstake functions)
  - rewards (used to keep track of the rewards)
  - lastClaimedRewards (the time that the user last claimed rewards)
- The contract uses AccessControl to grant stakers privileges to some functionalities (view rewards, claim rewards, unstake)
