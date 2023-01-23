const { ethers, run, network } = require("hardhat");
const { id, arrayify } = require("ethers/lib/utils");

async function main() {
  const accounts = await ethers.getSigners();
  const contractAddress = "0x2B65a93e41Be1480bE70Ec7703A1Af05643F3Bc3";
  const ERC721Address = "0x6Df882ab54444e38e5ed9a9f9684d66A0569c37f";
  const EvaluationAddress = "0x657e2603c61eC6562258d72ce9E2C27E8537F81C";
  const myContract = await hre.ethers.getContractAt("MySolution", contractAddress);
  const myERC721Contract = await hre.ethers.getContractAt("MyErc721", ERC721Address);
  const evaluationContract = await hre.ethers.getContractAt("Evaluator", EvaluationAddress);

  if ((await evaluationContract.exerciceProgression(accounts[0].address, 0)) == true) {
    console.log("> Submit : ", await evaluationContract.exerciceProgression(accounts[0].address, 0));
    const submit = await evaluationContract.submitExercice(myContract.address, {
      gasLimit: 5000000,
    });
    await submit.wait(1);
    console.log("> Submit : ", await evaluationContract.exerciceProgression(accounts[0].address, 0));
  } /*
  console.log(
    "> Exo1 : ",
    await evaluationContract.exerciceProgression(accounts[0].address, 1)
  );
  const exo1 = await evaluationContract.ex1_testERC721({ gasLimit: 5000000 });
  await exo1.wait(1);
  console.log(
    "> Exo1 : ",
    await evaluationContract.exerciceProgression(accounts[0].address, 1)
  );

  console.log("> Exo3 : ", await evaluationContract.exerciceProgression(accounts[0].address, 3));
  const exo3 = await evaluationContract.ex3_extractAddressFromSignature();
  await exo3.wait(1);
  console.log("> Exo3 : ", await evaluationContract.exerciceProgression(accounts[0].address, 3));

  const bytes32Chosen = id("Exo4");
  const signatureChosen = await accounts[0].signMessage(arrayify(bytes32Chosen));

  console.log("> Exo4 : ", await evaluationContract.exerciceProgression(accounts[0].address, 4));
  const exo4 = await evaluationContract.ex4_manageWhiteListWithSignature(bytes32Chosen, signatureChosen);
  await exo4.wait(1);
  console.log("> Exo4 : ", await evaluationContract.exerciceProgression(accounts[0].address, 4));
  */

  const hash = await myContract.getHash(EvaluationAddress);
  const signature = await accounts[0].signMessage(arrayify(hash));

  console.log("> Exo5 : ", await evaluationContract.exerciceProgression(accounts[0].address, 5));
  const exo5 = await evaluationContract.ex5_mintATokenWithASpecificSignature(signature);
  await exo5.wait(1);
  console.log("> Exo5 : ", await evaluationContract.exerciceProgression(accounts[0].address, 5));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
