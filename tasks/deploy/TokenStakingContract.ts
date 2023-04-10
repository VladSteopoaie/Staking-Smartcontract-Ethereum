import {task} from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { TokenStakingContract } from "../../typechain-types";
import { TokenStakingContract__factory } from "../../typechain-types";

// deployed: 0xfE3588B753762bae12Dc5BAEcEB6F4569c6a571B

task("deploy:TokenStakingContract").setAction(async function (
  taskArguments: TaskArguments,
  {ethers}
)
{
  const TokenStakingContractFactory: TokenStakingContract__factory = <TokenStakingContract__factory>(
    await ethers.getContractFactory("TokenStakingContract")
  );
  const TokenStakingContract: TokenStakingContract = <TokenStakingContract>(
    await TokenStakingContractFactory.deploy("TokenStakingContract", "R_TOKEN")
  );

  await TokenStakingContract.deployed();
  console.log("TokenStakingContract deployed to: ", TokenStakingContract.address);
}
);

