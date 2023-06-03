

const secp=require("ethereum-cryptography/secp256k1");

const {toHex}=require("ethereum-cryptography/utils");
const {keccak}=require("ethereum-cryptography/keccak");
const {sha256}=require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("@noble/curves/abstract/utils");

const privateKey=secp.secp256k1.utils.randomPrivateKey();
const publicKey=secp.secp256k1.getPublicKey(privateKey);

console.log('pvt key',toHex(privateKey))
console.log("public key :",toHex(publicKey));


const walletAddress="0x1"
const msgHash=toHex(sha256(utf8ToBytes(msg)));
console.log("hashed msg ",msgHash);


const signature=secp.secp256k1.sign(msgHash,privateKey);

console.log("generated signature = ",signature);


const verifySignature=secp.secp256k1.verify(signature,msgHash,publicKey);

console.log("verification : ",verifySignature);
