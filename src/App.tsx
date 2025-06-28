import { useEffect, useState } from "react";
import type { Testnet } from "./types/Testnet";
import TestnetCard from "./components/TestnetCard";

import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function App() {
  const [testnets, setTestnets] = useState<Testnet[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchTestnets = async () => {
      try {
        const res = await fetch("https://chainid.network/chains.json");
        const data = await res.json();
        console.log(data);

        // Filter for testnets only
        const testnetsOnly = data.filter(
          (chain: any) =>
            (chain.name && chain.name.toLowerCase().includes("testnet")) ||
            (chain.network && chain.network.toLowerCase().includes("testnet"))
        );

        const knownLogoChainIds = new Set([
          5,
          97,
          80001,
          420,
          421613,
          84531,
          11155111,
          43113, // etc.
        ]);
        // Map to local Testnet type
        const mapped: Testnet[] = testnetsOnly.map((chain: any) => ({
          name: chain.name,
          chainId: chain.chainId,
          rpc: chain.rpc?.[0] || "N/A",
          explorer: chain.explorers?.[0]?.url || "N/A",
          currency: chain.nativeCurrency?.symbol || "N/A",
          status: "active", // defaulting, as remote doesn't provide status
          logoUrl: knownLogoChainIds.has(chain.chainId)
            ? `https://chainid.network/assets/${chain.chainId}.svg`
            : undefined,
        }));

        setTestnets(mapped);
      } catch (err) {
        console.error("Failed to fetch chains:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestnets();
  }, []);

  const filtered = testnets.filter((net) =>
    net.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#fafafa"
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          🧪 Testnet Explorer
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: "gray" }}
        >
          Find and add EVM-compatible testnets to MetaMask with one click.
        </Typography>

        <TextField
          label="Search Testnets"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {paginated.map((net) => (
              <Grid size={{ xs: 12, sm: 6 }} key={net.chainId}>
                <TestnetCard testnet={net} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          gap={2}
        >
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            startIcon={<ArrowBackIosIcon />}
          ></Button>

          <Typography variant="body2">
            Page {page} of {totalPages}
          </Typography>

          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            endIcon={<ArrowForwardIosIcon />}
          ></Button>
        </Box>
      </Container>

      <Box mt={5} textAlign="center" fontSize="0.875rem" color="gray">
        Built by{" "}
        <a
          href="https://github.com/YOUR_GITHUB"
          target="_blank"
          rel="noreferrer"
        >
          you
        </a>{" "}
        — Powered by{" "}
        <a href="https://chainid.network" target="_blank" rel="noreferrer">
          chainid.network
        </a>
      </Box>
    </Box>
  );
}

export default App;
