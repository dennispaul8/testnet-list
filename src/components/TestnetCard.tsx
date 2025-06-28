import React from "react";
import type { Testnet } from "../types/Testnet";
import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Box,
  Chip,
  Button,
} from "@mui/material";

interface Props {
  testnet: Testnet;
}

const TestnetCard: React.FC<Props> = ({ testnet }) => {
  const handleAddToMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed.");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${testnet.chainId.toString(16)}`,
            chainName: testnet.name,
            nativeCurrency: {
              name: testnet.currency,
              symbol: testnet.currency,
              decimals: 18,
            },
            rpcUrls: [testnet.rpc],
            blockExplorerUrls: [testnet.explorer],
          },
        ],
      });
    } catch (error) {
      console.error("Error adding network:", error);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        height: "100%",
        maxHeight: 280, // Adjust based on content
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ flex: "1 1 auto", overflowY: "auto" }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {testnet.logoUrl && (
            <img
              src={testnet.logoUrl}
              alt={`${testnet.name} logo`}
              style={{ width: 24, height: 24 }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
          <Typography variant="h6" noWrap>
            {testnet.name}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="body2" noWrap>
            <strong>Chain ID:</strong> {testnet.chainId}
          </Typography>
          <Typography variant="body2" noWrap>
            <strong>Currency:</strong> {testnet.currency}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <strong>RPC:</strong>{" "}
            <MuiLink href={testnet.rpc} target="_blank" rel="noopener">
              {testnet.rpc}
            </MuiLink>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <strong>Explorer:</strong>{" "}
            <MuiLink href={testnet.explorer} target="_blank" rel="noopener">
              {testnet.explorer}
            </MuiLink>
          </Typography>
        </Box>
      </CardContent>

      <Box
        p={2}
        pt={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderTop="1px solid #eee"
      >
        <Chip
          label={testnet.status}
          color={testnet.status === "active" ? "success" : "default"}
          size="small"
        />
        <Button variant="contained" size="small" onClick={handleAddToMetaMask}>
          Add to MetaMask
        </Button>
      </Box>
    </Card>
  );
};

export default TestnetCard;
