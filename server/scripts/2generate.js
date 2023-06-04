

const secp=require("ethereum-cryptography/secp256k1");
const {toHex}=require("ethereum-cryptography/utils");
const {keccak}=require("ethereum-cryptography/keccak");
const {sha256}=require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("@noble/curves/abstract/utils");

const buffer= require("buffer");

console.log(secp.secp256k1);
const privateKey=secp.secp256k1.utils.randomPrivateKey();
    const publicKey=secp.secp256k1.getPublicKey(privateKey);
    console.log('pvt key',(privateKey))
    console.log("public key :",(publicKey));
    const base64privatekey = Buffer.from(privateKey).toString('base64');
    const base64Publickey = Buffer.from(publicKey).toString('base64');

// Decoding from Base64
const decodedUint8Array = Uint8Array.from(Buffer.from(base64privatekey, 'base64'));

console.log("base64 pvt key: ",base64privatekey);
console.log("base64 public key: ",base64Publickey);
console.log("reverse pvt : ",decodedUint8Array);

console.log("reverse public: ",Uint8Array.from(Buffer.from(base64Publickey, 'base64')));
//const hex_privatekey=toHex(privateKey);
//const buff_privatekey=buffer.Buffer(hex_privatekey,'hex');
//console.log("hex pvt: ",hex_privatekey);
//console.log("buff pvt key :",buff_privatekey);
    const walletAddress="0x3";
    const Hash=toHex(sha256(utf8ToBytes(walletAddress)));
    console.log("hashed wallet address ",Hash);


    const signature=secp.secp256k1.sign(Hash,privateKey);
    console.log("type: ",typeof(signature));
    console.log("generated signature = ",signature);
    

const verifySignature=secp.secp256k1.verify(signature,Hash,Uint8Array.from(Buffer.from(base64Publickey, 'base64')));

console.log("verification : ",verifySignature);
