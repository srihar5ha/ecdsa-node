


const { secp256k1 } = require("@noble/curves/secp256k1");
const {sha256}= require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("@noble/curves/abstract/utils");
const {toHex}=require("ethereum-cryptography/utils");
const {bytesToHex,hexToBytes}=require("@noble/curves/abstract/utils");


//console.log(secp256k1)

const priv = secp256k1.utils.randomPrivateKey();
console.log(priv)
const hexpriv=bytesToHex(Uint8Array.from(priv));
console.log("hex ",hexpriv);
console.log("reverse ",hexToBytes(hexpriv));

const publicKey=secp256k1.getPublicKey(priv);
console.log("hex public",bytesToHex(publicKey));

const msg = "0x3";

const Hash=toHex(sha256(utf8ToBytes(msg)));
console.log("message hash ",Hash);
    
const sig = secp256k1.sign(Hash, priv);
//console.log("sig is  ",sig);
const hexSig=sig.toCompactHex();
console.log("hex sig ",hexSig);

const verifySignature=secp256k1.verify(hexSig,Hash,publicKey);
if(verifySignature===true){
    console.log("correct h");
}
else{
    console.log("wrong");
}

console.log("verification : ",verifySignature);


