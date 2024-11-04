const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("HelloToken33 contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("HelloToken33");

    return { hardhatToken, owner, addr1, addr2 };
  }

  describe("Minting", function () {
    it("Should allow the owner to mint tokens", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const amount = 100;

      await hardhatToken.mint(owner.address, amount);
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(amount);
    });

    it("Should emit a Mint event on minting", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const amount = 100;

      await expect(hardhatToken.mint(owner.address, amount))
        .to.emit(hardhatToken, "Mint")
        .withArgs(owner.address, amount);
    });
  });

  describe("Transfers", function () {
    it("Should allow token transfer between accounts", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await hardhatToken.mint(owner.address, 100);
      await hardhatToken.transfer(addr1.address, amount);

      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should emit a Transfer event on transfer", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await hardhatToken.mint(owner.address, 100);

      await expect(hardhatToken.transfer(addr1.address, amount))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(owner.address, addr1.address, amount);
    });

    it("Should revert if balance is insufficient", async function () {
      const { hardhatToken, addr1, addr2 } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await expect(hardhatToken.connect(addr1).transfer(addr2.address, amount))
        .to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Allowances", function () {
    it("Should approve allowance for spender", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await hardhatToken.mint(owner.address, 100);
      await hardhatToken.approve(addr1.address, amount);

      expect(await hardhatToken.allowance(owner.address, addr1.address)).to.equal(amount);
    });

    it("Should allow transfer from an account with allowance", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await hardhatToken.mint(owner.address, 100);
      await hardhatToken.approve(addr1.address, amount);

      await hardhatToken.connect(addr1).transferFrom(owner.address, addr2.address, amount);

      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should emit Approval event on approval", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await expect(hardhatToken.approve(addr1.address, amount))
        .to.emit(hardhatToken, "Approval")
        .withArgs(owner.address, addr1.address, amount);
    });
  });

  describe("Pausing", function () {
    it("Should allow the owner to pause and unpause transfers", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      await hardhatToken.pause();
      expect(await hardhatToken.paused()).to.be.true;

      await hardhatToken.unpause();
      expect(await hardhatToken.paused()).to.be.false;
    });


  });

  describe("Burning", function () {
    it("Should allow accounts to burn their tokens", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await hardhatToken.mint(owner.address, 100);
      await hardhatToken.burn(amount);

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(50);
    });

    it("Should emit a Burn event on burning", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const amount = 50;

      await hardhatToken.mint(owner.address, 100);

      await expect(hardhatToken.burn(amount))
        .to.emit(hardhatToken, "Burn")
        .withArgs(owner.address, amount);
    });
  });
});
