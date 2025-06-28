import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#fafafa",
          },
        }
      : {
          background: {
            default: "#121212",
          },
        }),
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});