pragma solidity ^0.6.2;

import "./IExerciceSolution.sol";
import {MyErc721} from "./MyErc721.sol";

contract MySolution is IExerciceSolution {
    MyErc721 public myErc721Contract;

    constructor(string memory name, string memory symbol) public {
        myErc721Contract = new MyErc721(name, symbol);
    }

    function ERC721Address() external override returns (address) {
        return address(myErc721Contract);
    }

    function mintATokenForMe() external override returns (uint256) {
        uint256 tokenID = myErc721Contract.mint(msg.sender);

        return tokenID;
    }

    function mintATokenForMeWithASignature(
        bytes calldata _signature
    ) external override returns (uint256) {}

    function getAddressFromSignature(
        bytes32 _hash,
        bytes calldata _signature
    ) external override returns (address) {}

    function signerIsWhitelisted(
        bytes32 _hash,
        bytes calldata _signature
    ) external override returns (bool) {}

    function whitelist(address _signer) external override returns (bool) {}
}
