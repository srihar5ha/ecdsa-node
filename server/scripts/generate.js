

//const secp=require("ethereum-cryptography/secp256k1");
const {toHex}=require("ethereum-cryptography/utils");
const {keccak}=require("ethereum-cryptography/keccak");
const {sha256}=require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("@noble/curves/abstract/utils");
const {bytesToHex,hexToBytes}=require("@noble/curves/abstract/utils");
const { secp256k1 } = require("@noble/curves/secp256k1");

const buffer=require("buffer");
const { Hash } = require("crypto");
//const privateKey=secp.secp256k1.utils.randomPrivateKey();


//input privatekey is in Hex format. convert into bytes when needed.
function generateSign(walletAddress,privateKey){
    const Bytes_privateKey=hexToBytes(privateKey);

    //const uint8privateKey=Uint8Array.from(Buffer.from(privateKey, 'base64'));
    //const publicKey=secp.secp256k1.getPublicKey(uint8privateKey);
    //console.log('pvt key',toHex(privateKey))
//    console.log("public key :",toHex(publicKey));


    //const walletAddress=walletAddress;
    const Hash=toHex(sha256(utf8ToBytes(walletAddress)));
    console.log("hashed wallet address ",Hash);
    
   // const uint8privateKey=Uint8Array.from(Buffer.from(privateKey, 'base64'));
    
    const signature=secp256k1.sign(Hash, hexToBytes(privateKey));
    console.log("generated signature = ",signature);

    return signature.toCompactHex();// sending signature as hex.
}

function verifySignature(signature,sender,publicKey){
   // const uint8public=Uint8Array.from(Buffer.from(publicKey, 'base64'))
    const Hash=toHex(sha256(utf8ToBytes(sender)));
    const valid=secp256k1.verify(signature,Hash,hexToBytes(publicKey));
    console.log("inside verification ",valid);
    return valid

}

//module.exports = generateSign;
module.exports = {
    generateSign,
    verifySignature,
  };
//const verifySignature=secp.secp256k1.verify(signature,msgHash,publicKey);

//console.log("verification : ",verifySignature);
