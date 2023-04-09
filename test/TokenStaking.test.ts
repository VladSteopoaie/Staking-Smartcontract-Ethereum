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

    TokenStakingFactory = (await ethers.getContractFactory(
      "TokenStakingContract",
      owner
    )) as TokenStakingContract__factory;
  });

  beforeEach(async () => {
    TokenStakingContract = await TokenStakingFactory.deploy(
      "TokenStaking",
      "R_TOKEN"
    );
  });

  it("Testing the deployment parameters", async () => {
    expect(await TokenStakingContract.name()).to.be.equals("TokenStaking");
    expect(await TokenStakingContract.symbol()).to.be.equals("R_TOKEN");
  });

  it("The owner should be DEFAULT_ADMIN_ROLE", async () => {
    let Admin = ethers.utils.hexZeroPad(
      await TokenStakingContract.DEFAULT_ADMIN_ROLE(),
      32
    );

    expect(
      await TokenStakingContract.connect(owner).hasRole(Admin, owner.address)
    ).to.be.equal(true);
  });

  it("The owner should have minted the R_Tokens", async () => {
    expect(await TokenStakingContract.balanceOf(owner.address)).to.be.equal(
      BigInt("1022000000000000000000000")
    );
  });

  it("Testing the staking function", async () => {
    // Is the event emited?

    await expect(
      TokenStakingContract.connect(andy).stakeMatic({
        value: ethers.utils.parseEther("0.1"),
      })
    )
      .emit(TokenStakingContract, "StakeMatic")
      .withArgs(ethers.utils.parseEther("0.1"), andy.address);

    // Does the balance of the contract change?
    expect(
      await ethers.provider.getBalance(TokenStakingContract.address)
    ).to.be.equals(ethers.utils.parseEther("0.1"));

    // Does the user received the MATIC_STAKE_ROLE?
    let Staker = ethers.utils.hexZeroPad(
      await TokenStakingContract.MATIC_STAKER_ROLE(),
      32
    );

    expect(
      await TokenStakingContract.hasRole(Staker, andy.address)
    ).to.be.equal(true);

    // Updated user info
    console.log(await TokenStakingContract.userInfo(andy.address));
  });

  it("The user should stake multiple times", async () => {
    // First staking
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.1"),
    });
    console.log(await TokenStakingContract.userInfo(andy.address));
    
    // Second staking
    await time.increaseTo(1681984329);
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.15"),
    });

    console.log(await TokenStakingContract.userInfo(andy.address));
  });

});
