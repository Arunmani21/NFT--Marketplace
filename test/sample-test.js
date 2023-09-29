const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('NFTMarketplace', function () {
  let NFTMarketplace;
  let nftMarketplace;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
    nftMarketplace = await NFTMarketplace.connect(owner).deploy();
    await nftMarketplace.deployed();
  });

  it('Should create and list an NFT', async function () {
    const tokenURI = 'https://example.com/mynft';
    const price = ethers.utils.parseEther('0.1');

    await nftMarketplace.connect(owner).updateListPrice(ethers.utils.parseEther('0.01'));
    await nftMarketplace.connect(addr1).createToken(tokenURI, price, { value: ethers.utils.parseEther('0.01') });

    const latestItem = await nftMarketplace.getLatestIdToListedToken();

    expect(latestItem.tokenId).to.equal(1);
    expect(latestItem.seller).to.equal(addr1.address);
    expect(latestItem.owner).to.equal(nftMarketplace.address);
    expect(latestItem.price).to.equal(price);
    expect(latestItem.currentlyListed).to.equal(true);
  });

  it('Should allow a user to buy an NFT', async function () {
    const tokenURI = 'https://example.com/mynft';
    const price = ethers.utils.parseEther('0.1');

    await nftMarketplace.connect(owner).updateListPrice(ethers.utils.parseEther('0.01'));
    await nftMarketplace.connect(addr1).createToken(tokenURI, price, { value: ethers.utils.parseEther('0.01') });

    const latestItem = await nftMarketplace.getLatestIdToListedToken();

    await nftMarketplace.connect(addr2).executeSale(latestItem.tokenId, { value: price });

    const updatedItem = await nftMarketplace.getListedTokenForId(latestItem.tokenId);

    expect(updatedItem.currentlyListed).to.equal(false);
    expect(updatedItem.owner).to.equal(addr2.address);
    expect(updatedItem.price).to.equal(price);
    expect(updatedItem.seller).to.equal(addr1.address);
  });

  it('Should show the bought NFT in user\'s collection', async function () {
    const tokenURI = 'https://example.com/mynft';
    const price = ethers.utils.parseEther('0.1');

    await nftMarketplace.connect(owner).updateListPrice(ethers.utils.parseEther('0.01'));
    await nftMarketplace.connect(addr1).createToken(tokenURI, price, { value: ethers.utils.parseEther('0.01') });

    const latestItem = await nftMarketplace.getLatestIdToListedToken();

    await nftMarketplace.connect(addr2).executeSale(latestItem.tokenId, { value: price });

    const addr2NFTs = await nftMarketplace.connect(addr2).getMyNFTs();

    expect(addr2NFTs.length).to.equal(1);
    expect(addr2NFTs[0].tokenId).to.equal(1);
    expect(addr2NFTs[0].owner).to.equal(addr2.address);
    expect(addr2NFTs[0].price).to.equal(price);
    expect(addr2NFTs[0].currentlyListed).to.equal(false);
  });
});
