
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleOneTimeTransferNFT {
    mapping(uint256 => address) private _owners;
    mapping(uint256 => bool) private _transferred;
    mapping(uint256 => string) private _tokenURIs; // Store the HTTP URL (metadata)
    uint256 private _tokenIdCounter;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor() {}

    // The mint function takes an HTTP URL as a string (representing JSON metadata)
    function mint(string memory tokenURI) public returns (address) {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        _owners[newTokenId] = msg.sender;
        _tokenURIs[newTokenId] = tokenURI; // Store the tokenURI (the JSON file URL)
        emit Transfer(address(0), msg.sender, newTokenId);

        // Return the address of the contract
        return address(this);
    }

    function transfer(address to, uint256 tokenId) public {
        require(_owners[tokenId] == msg.sender, "Not the owner");
        require(!_transferred[tokenId], "Already transferred");
        _owners[tokenId] = to;
        _transferred[tokenId] = true;
        emit Transfer(msg.sender, to, tokenId);
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    // Get the token URI (the JSON file URL)
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}

