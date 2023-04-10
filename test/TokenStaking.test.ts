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
    // console.log(await TokenStakingContract.userInfo(andy.address));
  });

  it("The user should stake multiple times", async () => {
    // First staking
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.1"),
    });
    // Second staking
    
    await time.increase(86400); // increase the time to 24h
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.15"),
    });



    // console.log(await TokenStakingContract.userInfo(andy.address));

    await time.increase(86400 * 10); // increase the time to 24h * number of days
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.4"),
    });

    // Number of stakers should change
    expect(await TokenStakingContract.numberOfStakers()).to.be.equal(1);

    // console.log(await TokenStakingContract.userInfo(andy.address));
  });
  
  it("The user shouldn't stake in the same day", async () => {
    // First staking
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.1"),
    });
    // console.log(await TokenStakingContract.userInfo(andy.address));
    
    // Second staking
    
    await time.increase(86200); // increase the time to 24h
    await expect(TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.15"),
    })).to.be.revertedWith("You have to wait 1 day before you can stake!");
    
  });
  
  it("Multiple users should stake and receive rewards", async() => {
    
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.1"),
    });
    
    // console.log(await TokenStakingContract.userInfo(andy.address));
    await TokenStakingContract.connect(bob).stakeMatic({
      value: ethers.utils.parseEther("0.3"),
    });
    
    await time.increase(86400 * 2);
    await TokenStakingContract.connect(user).stakeMatic({
      value: ethers.utils.parseEther("0.3"),
    });
    // Also testing the variables from the contract
    expect(await TokenStakingContract.numberOfStakers()).to.be.equal(3);
    expect(await TokenStakingContract.totalAmountStaked()).to.be.equal(ethers.utils.parseUnits("0.7"));


    expect(await TokenStakingContract.connect(andy).viewRewards()).to.be.equal(ethers.utils.parseUnits("1400"));
    expect(await TokenStakingContract.connect(bob).viewRewards()).to.be.equal(ethers.utils.parseEther("4200"))
    expect(await TokenStakingContract.connect(user).viewRewards()).to.be.equal(ethers.utils.parseEther("0"));
  });

  it("Testing the unstake function", async () => {
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("10"),
    });
    await time.increase(86400 * 4);
    await expect(TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseEther("3")))
    .emit(TokenStakingContract, "UnstakeMatic").withArgs(ethers.utils.parseEther("3"), andy.address);

    expect(
      await ethers.provider.getBalance(TokenStakingContract.address)
    ).to.be.equals(ethers.utils.parseEther("7"));

  });

  it("Unstake errors", async() => {
    // User shouldn't be able to unstake before staking
    await expect (TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("5")))
    .reverted;

    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("10"),
    });
    // User should't be able to unstake only after 24h
    await expect (TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("5")))
    .revertedWith("You have to wait 1 day before you can unstake!");

    await time.increase(86400 * 2);
    
    // Insuficient balance
    await expect (TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("11")))
    .revertedWith("Insuficient balance!");
    
    // Amount must be greater than 0
    await expect (TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("0")))
    .revertedWith("Nothing to unstake!");
    
    // User should not have the staker role after unstaking all the funds
    await TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("10"));

    let Staker = ethers.utils.hexZeroPad(
      await TokenStakingContract.MATIC_STAKER_ROLE(),
      32
    );
    
    expect(
      await TokenStakingContract.hasRole(Staker, andy.address)
    ).to.be.equal(false);
  });

});
