import { StrictMode, useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { getDesignTokens } from "./theme"; // your theme.ts
import "./index.css";

const Root = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App
          toggleMode={() =>
            setMode((prev) => (prev === "light" ? "dark" : "light"))
          }
        />
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
