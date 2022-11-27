pragma solidity ^0.6.2;

import "./IExerciceSolution.sol";

contract MySolution is IExerciceSolution {
    function ERC721Address() external override returns (address) {}

    function mintATokenForMe() external override returns (uint256) {}

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
