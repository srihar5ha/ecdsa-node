import React, { useState } from "react";
import server from "./server";

function Signature({ walletAddress }) {
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  const generateMessage = async () => {
    try {
      const response = await server.post(`generate-signature`, {
        walletAddress,
        privateKey,
      });
      console.log("response in signature component ",response);
      const generatedMessage = response.data;
      console.log("generated message ",generateMessage);
      setMessage(generatedMessage);
    } catch (error) {
      console.error("Error generating message:", error);
      // Handle any error scenarios here, e.g., display an error message
    }
  };

  return (
    <div className="container signature">
     
      <h2>Generate Signature</h2>
      <label>
        Wallet Address:
        <input type="text" value={walletAddress} disabled />
      </label>
      <br />
      <label>
        Private Key:
        <input type="text" value={privateKey} onChange={handlePrivateKeyChange} />
      </label>
      <br />
      <button  onClick={generateMessage}>Generate</button>
      <br />
      <label>
        Signature:
        <textarea value={message} readOnly />
      </label>
      
    </div>
    
  );
}

export default Signature;
