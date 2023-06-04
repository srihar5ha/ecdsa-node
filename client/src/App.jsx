import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Signature  from "./signature";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
      <Signature walletAddress={address} />
    </div>
  );
}

export default App;
