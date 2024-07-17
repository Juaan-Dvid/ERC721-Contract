import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  
  describe("GamePowerUp", function () {
    // Define a fixture to reuse the same setup in every test.
    async function deployGamePowerUpFixture() {
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      // Deploy the GamePowerUp contract
      const GamePowerUp = await hre.ethers.getContractFactory("GamePowerUp");
      const gamePowerUp = await GamePowerUp.deploy(owner.address);
  
      return { gamePowerUp, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        const { gamePowerUp, owner } = await loadFixture(deployGamePowerUpFixture);
  
        expect(await gamePowerUp.owner()).to.equal(owner.address);
      });
    });
  
    describe("Minting", function () {
      it("Should mint a new token and set the correct URI", async function () {
        const { gamePowerUp, owner } = await loadFixture(deployGamePowerUpFixture);
  
        const tokenId = 1;
        const tokenURI = "https://example.com/token/1";
  
        // Mint a new token
        await gamePowerUp.safeMint(owner.address, tokenURI);
        console.log("Minted token",tokenId);
  
        // Verify the token exists and the URI is set correctly
        expect(await gamePowerUp.ownerOf(tokenId)).to.equal(owner.address);
        expect(await gamePowerUp.tokenURI(tokenId)).to.equal(tokenURI);
        
      });  
      
    });
  
    describe("URI and Interface", function () {
      it("Should return the correct token URI", async function () {
        const { gamePowerUp, owner } = await loadFixture(deployGamePowerUpFixture);
  
        const tokenId = 1;
        const tokenURI = "https://example.com/token/1";
  
        await gamePowerUp.safeMint(owner.address, tokenURI);
        expect(await gamePowerUp.tokenURI(tokenId)).to.equal(tokenURI);
      });
  
      it("Should support the ERC721 interface", async function () {
        const { gamePowerUp } = await loadFixture(deployGamePowerUpFixture);
  
        const ERC721_INTERFACE_ID = "0x80ac58cd";
        expect(await gamePowerUp.supportsInterface(ERC721_INTERFACE_ID)).to.be.true;
      });
  
      it("Should support the ERC721Metadata interface", async function () {
        const { gamePowerUp } = await loadFixture(deployGamePowerUpFixture);
  
        const ERC721_METADATA_INTERFACE_ID = "0x5b5e139f";
        expect(await gamePowerUp.supportsInterface(ERC721_METADATA_INTERFACE_ID)).to.be.true;
      });
    });
  });
  