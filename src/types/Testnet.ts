export interface Testnet {
  name: string;
  chainId: number;
  rpc: string;
  explorer: string;
  currency: string;
  status: "active" | "deprecated" | "unknown";
}
