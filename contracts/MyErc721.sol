pragma solidity ^0.6.2;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyErc721 is ERC721, Ownable {
    uint256 tokenID;

    constructor(
        string memory name,
        string memory symbol
    ) public ERC721(name, symbol) {
        tokenID = 0;
    }

    function mint(address account) public onlyOwner returns (uint256) {
        tokenID++;
        _mint(account, tokenID);

        return tokenID;
    }

    function burn(uint256 _tokenID) public onlyOwner {
        _burn(_tokenID);
    }
}
