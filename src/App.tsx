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

import { useTheme } from "@mui/material/styles";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function App({ toggleMode }: { toggleMode: () => void }) {
  const theme = useTheme();

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const filtered = testnets.filter((net) =>
    net.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to bottom, #0f0f0f, #1a1a1a)"
            : "linear-gradient(to bottom, #ffffff, #f5f7fa)",
        color: theme.palette.text.primary,
        transition: "background 0.5s ease",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 6,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Tooltip title="Toggle Dark Mode">
            <IconButton onClick={toggleMode} color="inherit">
              {theme.palette.mode === "dark" ? (
                <LightModeIcon
                  sx={{
                    transition: "transform 0.3s",
                    transform: "rotate(0deg)",
                  }}
                />
              ) : (
                <DarkModeIcon
                  sx={{
                    transition: "transform 0.3s",
                    transform: "rotate(180deg)",
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="h3" fontWeight={600} gutterBottom align="center">
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
          gap={1}
        >
          <Button onClick={() => setPage(1)} disabled={page === 1}>
            <FirstPageIcon fontSize="large" />
          </Button>

          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ArrowBackIosIcon />
          </Button>

          <Typography variant="body2">
            Page {page} of {totalPages}
          </Typography>

          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            <ArrowForwardIosIcon />
          </Button>

          <Button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <LastPageIcon fontSize="large" />
          </Button>
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
