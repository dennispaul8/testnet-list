import { useEffect, useState } from "react";
import type { Testnet } from "./types/Testnet";
import rawData from "./data/testnets.json" assert { type: "json" };
import TestnetCard from "./components/TestnetCard";

const testnetData = rawData as Testnet[];

function App() {
  const [testnets, setTesnets] = useState<Testnet[]>([]);

  useEffect(() => {
    setTesnets(testnetData);
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>📡 Blockchain Testnets</h1>
      {testnets.map((net) => (
        <TestnetCard key={net.chainId} testnet={net} />
      ))}
    </div>
  );
}

export default App;
