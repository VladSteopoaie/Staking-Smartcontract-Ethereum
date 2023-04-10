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

  it("The contract should have minted the R_Tokens", async () => {
    expect(await TokenStakingContract.balanceOf(TokenStakingContract.address)).to.be.equal(
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

  it("Testing the maximum stake amount", async() => {
    await TokenStakingContract.connect(owner).stakeMatic({
      value: ethers.utils.parseUnits("100")
    });
    time.increase(86400 * 2);
    await TokenStakingContract.connect(bob).stakeMatic({
      value: ethers.utils.parseUnits("300")
    });
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseUnits("250")
    });
    time.increase(86400 * 2);
    await TokenStakingContract.connect(user).stakeMatic({
      value: ethers.utils.parseUnits("250")
    });
    time.increase(86400 * 2);
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseUnits("50")
    });

    await TokenStakingContract.connect(owner).unstakeMatic(ethers.utils.parseUnits("10"));
    
    time.increase(86400 * 2);
    await expect (TokenStakingContract.connect(owner).stakeMatic({
      value: ethers.utils.parseUnits("70")
    }))
      .revertedWith("The maximum staked amount has been exeeded!");
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

    // User should not have the staker role after unstaking all the funds
    // And should have the claimer role
    await time.increase(86400);
    await TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("7"));

    let Staker = ethers.utils.hexZeroPad(
      await TokenStakingContract.MATIC_STAKER_ROLE(),
      32
    );

    let Claimer = ethers.utils.hexZeroPad(
      await TokenStakingContract.CLAIMER_ROLE(),
      32
    );
    
    expect(
      await TokenStakingContract.hasRole(Staker, andy.address)
    ).to.be.equal(false);
    
    expect(
      await TokenStakingContract.hasRole(Claimer, andy.address)
    ).to.be.equal(true);

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
    
    
  });

  it("Testing claimRewards function", async() => {
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.1"),
    });
    
    // console.log(await TokenStakingContract.userInfo(andy.address));
    await TokenStakingContract.connect(bob).stakeMatic({
      value: ethers.utils.parseEther("0.2"),
    });
    
    await time.increase(86400 * 2);
    await TokenStakingContract.connect(user).stakeMatic({
      value: ethers.utils.parseEther("0.4"),
    });
    
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseEther("0.3"),
    });
    await time.increase(86400 * 10);

    let rewardsAndy = await TokenStakingContract.connect(andy).viewRewards();
    let rewardsBob = await TokenStakingContract.connect(bob).viewRewards();
    let rewardsUser = await TokenStakingContract.connect(user).viewRewards();

    await expect(TokenStakingContract.connect(andy).claimRewards())
    .emit(TokenStakingContract, "ClaimRewards").withArgs(rewardsAndy, andy.address);
    await expect(TokenStakingContract.connect(bob).claimRewards())
    .emit(TokenStakingContract, "ClaimRewards").withArgs(rewardsBob, bob.address);
    await expect(TokenStakingContract.connect(user).claimRewards())
    .emit(TokenStakingContract, "ClaimRewards").withArgs(rewardsUser, user.address);

    expect(await TokenStakingContract.balanceOf(andy.address)).to.be.equal(rewardsAndy);
    expect(await TokenStakingContract.balanceOf(bob.address)).to.be.equal(rewardsBob);
    expect(await TokenStakingContract.balanceOf(user.address)).to.be.equal(rewardsUser);

    time.increase(86400 * 3);
    // After unstake and claim user should not have claim role
    await TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("0.4"));
    
    await TokenStakingContract.connect(andy).claimRewards();

    let Claimer = ethers.utils.hexZeroPad(
      await TokenStakingContract.CLAIMER_ROLE(),
      32
    );
    
    expect(
      await TokenStakingContract.hasRole(Claimer, andy.address)
    ).to.be.equal(false);
    


  });

  it("Claiming rewards errors", async() => {
    // User cannot claim without staking
    await expect(TokenStakingContract.connect(andy).claimRewards()).revertedWith("Not eligible to claim rewards!");
    
    // User cannot claim right after staking
    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseUnits("10")
    });
    time.increase(86380); // the limit is 24h after that the user can claim
    await expect(TokenStakingContract.connect(andy).claimRewards()).revertedWith("No rewards to claim!");
    
    time.increase(300); // now the user can claim
    await TokenStakingContract.connect(andy).claimRewards();
    // user should not be able to claim right after another claim
    await expect(TokenStakingContract.connect(andy).claimRewards()).revertedWith("No rewards to claim!");
    
    time.increase(86400 * 10);

    await TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("10"));

    await TokenStakingContract.connect(andy).claimRewards();

    await expect(TokenStakingContract.connect(andy).claimRewards()).revertedWith("Not eligible to claim rewards!");
    time.increase(86400 * 7);
    // if the user claims rewards and after unstakes, they should be able to claim once more but 0 rewards

    await TokenStakingContract.connect(andy).stakeMatic({
      value: ethers.utils.parseUnits("10")
    });

    time.increase(86400 * 10);

    await TokenStakingContract.connect(andy).claimRewards();
    await TokenStakingContract.connect(andy).unstakeMatic(ethers.utils.parseUnits("10"));
    await expect(TokenStakingContract.connect(andy).claimRewards()).revertedWith("Not eligible to claim rewards!");

  });

});
