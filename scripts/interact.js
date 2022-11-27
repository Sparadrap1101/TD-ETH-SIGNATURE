const { ethers, run, network } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  const contractAddress = "0xCA77aB66D91eB5F3BD01f3EcC2b5c6628B533C36";
  const ERC721Address = "0x6Df882ab54444e38e5ed9a9f9684d66A0569c37f";
  const EvaluationAddress = "0x657e2603c61eC6562258d72ce9E2C27E8537F81C";
  const myContract = await hre.ethers.getContractAt(
    "MySolution",
    contractAddress
  );
  const myERC721Contract = await hre.ethers.getContractAt(
    "MyErc721",
    ERC721Address
  );
  const evaluationContract = await hre.ethers.getContractAt(
    "Evaluator",
    EvaluationAddress
  );
  /*
  if (
    (await evaluationContract.exerciceProgression(accounts[0].address, 0)) ==
    true
  ) {
    console.log(
      "> Submit : ",
      await evaluationContract.exerciceProgression(accounts[0].address, 0)
    );
    console.log("Test2");
    const submit = await evaluationContract.submitExercice(myContract.address, {
      gasLimit: 5000000,
    });
    await submit.wait(1);

    console.log(
      "> Submit : ",
      await evaluationContract.exerciceProgression(accounts[0].address, 0)
    );
  }
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
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
