import { useEffect, useState } from "react";
import type { Testnet } from "./types/Testnet";
import rawData from "./data/testnets.json" assert { type: "json" };
import TestnetCard from "./components/TestnetCard";

import { Container, Typography, Grid } from "@mui/material";

const testnetData = rawData as Testnet[];

function App() {
  const [testnets, setTestnets] = useState<Testnet[]>([]);

  useEffect(() => {
    setTestnets(testnetData);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📡 Blockchain Testnets
      </Typography>

      <Grid container spacing={2}>
        {testnets.map((net) => (
          <Grid size={{ xs: 12, sm: 6 }} key={net.chainId}>
            <TestnetCard testnet={net} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
