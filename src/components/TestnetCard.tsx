import React from "react";
import type { Testnet } from "../types/Testnet";
import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Box,
  Chip,
} from "@mui/material";

interface Props {
  testnet: Testnet;
}

const TestnetCard: React.FC<Props> = ({ testnet }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {testnet.name}
        </Typography>

        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="body2">
            <strong>Chain ID:</strong> {testnet.chainId}
          </Typography>

          <Typography variant="body2">
            <strong>Currency:</strong> {testnet.currency}
          </Typography>

          <Typography variant="body2">
            <strong>RPC:</strong>{" "}
            <MuiLink href={testnet.rpc} target="_blank" rel="noopener">
              {testnet.rpc}
            </MuiLink>
          </Typography>

          <Typography variant="body2">
            <strong>Explorer:</strong>{" "}
            <MuiLink href={testnet.explorer} target="_blank" rel="noopener">
              {testnet.explorer}
            </MuiLink>
          </Typography>

          <Box mt={1}>
            <Chip
              label={testnet.status}
              color={testnet.status === "active" ? "success" : "default"}
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestnetCard;
