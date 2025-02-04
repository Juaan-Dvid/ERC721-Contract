// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GamePowerUp is ERC721, ERC721URIStorage, Ownable {

    uint256 private _counterTokenId;

    constructor(address initialOwner)
        ERC721("GamePowerUp", "GPU")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory uri)
        public        
    {
        _counterTokenId++;
        _safeMint(to, _counterTokenId);
        _setTokenURI(_counterTokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}