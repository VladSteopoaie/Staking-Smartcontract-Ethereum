import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenStakingContract__factory } from "../typechain-types";

describe("TokenStaking", async () => {
  let TokenStakingFactory: any;
  let TokenStakingContract: any;

  let owner: any;
  let user: any;
  let andy: any;
  let bob: any;

  before(async () => {
    [owner, user, andy, bob] = await ethers.getSigners();

    TokenStakingFactory = (await ethers.getContractFactory("TokenStakingContract", owner)) as TokenStakingContract__factory;

  });

  beforeEach(async () => {
    TokenStakingContract = await TokenStakingFactory.deploy("TokenStaking", "R_Token");
  });

  it("Name must be set as TokenStaking", async () =>{
    expect(await TokenStakingContract.name()).to.be.equals("TokenStaking");
  });

  it("Symbol must be set as R_Token", async () =>{
    expect(await TokenStakingContract.symbol()).to.be.equals("R_Token");
  });

  it("The owner should be DEFAULT_ADMIN_ROLE", async () => {
    let Admin = ethers.utils.hexZeroPad(await TokenStakingContract.DEFAULT_ADMIN_ROLE(), 32);

    expect(await TokenStakingContract.connect(owner).hasRole(Admin, owner.address)).to.be.equal(true);
  });

  it("The owner should have minted the R_Tokens", async () => {
    expect(await TokenStakingContract.balanceOf(owner.address)).to.be.equal(BigInt("1022000000000000000000000"));
  });

  it("Testing the staking function", async () => {
    
    await expect(TokenStakingContract.connect(andy).stake({value: ethers.utils.parseEther("0.1")}))
    .emit(TokenStakingContract, "Stake").withArgs(ethers.utils.parseEther("0.1"), andy.address);

  });

});