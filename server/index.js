const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
//const generateSign= require("./scripts/generate");
const { generateSign, verifySignature } = require("./scripts/generate");
app.use(cors());
app.use(express.json());
const util=require("util");

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount,signature,publicKey} = req.body;
  const isSignatureValid = verifySignature(signature,sender,publicKey);
  console.log("in index signature recieved is : ",signature);
  if (!isSignatureValid) {
    res.status(400).send({ message: "please check signature!" });
    return;
  }
  else{
    console.log("yes valid sign.");
  }


  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.post("/generate-signature", (req, res) => {
  const { walletAddress, privateKey } = req.body;
  const genSign=generateSign(walletAddress,privateKey);
  console.log("in index.js ",genSign);
  res.send(genSign);
  console.log("response sent from index");


});





app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
