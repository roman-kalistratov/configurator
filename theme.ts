import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#b5b2b2",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fff",
      paper: "#EDF1F4",
    },
  },
  typography: {
    fontFamily: "Assistant, sans-serif",

    h1: {
      fontSize: 35,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 20,
    },
    body1: {
      fontWeight: "500",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
      styleOverrides: {
        root: {
          "@media (min-width:600px)": {
            maxWidth: "1650px",
          },
        },
      },
    },
  },
})

export default theme
