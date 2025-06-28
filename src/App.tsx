import { useEffect, useState } from "react";
import type { Testnet } from "./types/Testnet";
import rawData from "./data/testnets.json" assert { type: "json" };
import TestnetCard from "./components/TestnetCard";

import { Container, Typography, Grid, TextField } from "@mui/material";

const testnetData = rawData as Testnet[];

function App() {
  const [testnets, setTestnets] = useState<Testnet[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTestnets(testnetData);
  }, []);

  const filtered = testnets.filter((net) =>
    net.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📡 Blockchain Testnets
      </Typography>

      <TextField
        label="Search Testnets"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, color: "white" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={2}>
        {filtered.map((net) => (
          <Grid size={{ xs: 12, sm: 6 }} key={net.chainId}>
            <TestnetCard testnet={net} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
