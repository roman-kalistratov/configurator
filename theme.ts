import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#007aff",
      dark: "#0B6BB6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#000",
      light: "#EAEAEA",
      dark: "#b5b2b2",
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
      fontSize: 20,
      fontWeight: "600",
    },
    h3: {
      fontSize: ".975rem",
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
