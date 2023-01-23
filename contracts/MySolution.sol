pragma solidity ^0.6.2;

import "./IExerciceSolution.sol";
import {MyErc721} from "./MyErc721.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";

contract MySolution is IExerciceSolution {
  MyErc721 public myErc721Contract;
  mapping(address => bool) public whitelisted;

  constructor(string memory name, string memory symbol) public {
    myErc721Contract = new MyErc721(name, symbol);
    whitelisted[msg.sender] = true;
  }

  function ERC721Address() external override returns (address) {
    return address(myErc721Contract);
  }

  function mintATokenForMe() external override returns (uint256) {
    uint256 tokenID = myErc721Contract.mint(msg.sender);

    return tokenID;
  }

  function mintATokenForMeWithASignature(bytes calldata _signature) external override returns (uint256) {
    address evaluatorAddress = 0x657e2603c61eC6562258d72ce9E2C27E8537F81C;
    bytes32 _hash = keccak256(abi.encodePacked(evaluatorAddress, tx.origin, address(myErc721Contract)));

    require(this.signerIsWhitelisted(_hash, _signature), "not whitelisted");

    return myErc721Contract.mint(msg.sender);
  }

  function getHash(address evaluatorAddress) public view returns (bytes32) {
    bytes32 _hash = keccak256(abi.encodePacked(evaluatorAddress, tx.origin, address(myErc721Contract)));

    return _hash;
  }

  function getAddressFromSignature(bytes32 _hash, bytes calldata _signature) external override returns (address) {
    address addrFromSign = ECDSA.recover(ECDSA.toEthSignedMessageHash(_hash), _signature);

    return addrFromSign;
  }

  function signerIsWhitelisted(bytes32 _hash, bytes calldata _signature) external override returns (bool) {
    address signerAddr = this.getAddressFromSignature(_hash, _signature);

    return whitelisted[signerAddr];
  }

  function whitelist(address _signer) external override returns (bool) {
    return whitelisted[_signer];
  }
}
