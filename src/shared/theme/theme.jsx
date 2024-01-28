// src/shared/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
    },
    secondary: {
      main: "#7FDBFF",
    },
    error: {
      main: "#FF4136",
    },
    warning: {
      main: "#FFDC00",
    },
    info: {
      main: "#F2F2F2",
    },
    text: {
      primary: "#333333",
      secondary: "#000000",
    },
    background: {
      default: "#F2F2F2",
    },
  },
  typography: {
    fontFamily: [
      '"Roboto Slab"',
      '"Open Sans"',
      "Merriweather",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
    },
    caption: {
      fontFamily: "Merriweather, serif",
      fontStyle: "italic",
    },
  },
  // Any other global overrides
});

export default theme;
