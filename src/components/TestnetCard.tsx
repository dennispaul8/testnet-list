import React from "react";
import type { Testnet } from "../types/Testnet";

interface Props {
  testnet: Testnet;
}

const TestnetCard: React.FC<Props> = ({ testnet }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#f9f9f9",
        color: "black",
      }}
    >
      <h2>{testnet.name}</h2>
      <p>
        <strong>Chain ID:</strong> {testnet.chainId}
      </p>
      <p>
        <strong>Currency:</strong> {testnet.currency}
      </p>
      <p>
        <strong>RPC:</strong>{" "}
        <a href={testnet.rpc} target="_blank" rel="noopener noreferrer">
          {testnet.rpc}
        </a>
      </p>
      <p>
        <strong>Explorer:</strong>{" "}
        <a href={testnet.explorer} target="_blank" rel="noopener noreferrer">
          {testnet.explorer}
        </a>
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color: testnet.status === "active" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {testnet.status}
        </span>
      </p>
    </div>
  );
};

export default TestnetCard;
