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
      main: "#FDC70F",
      light: "#EAEAEA",
      dark: "#d7d7d8",
    },
    background: {
      default: "#fff",
      paper: "#EDF1F4",
    },
  },
  typography: {
    fontFamily: "Assistant, sans-serif",
    h2: {
      fontSize: "20px",
      fontWeight: "500",
    },
    h3: {
      fontSize: ".975rem",
    },
    body1: {
      fontWeight: "500",
    },
    body2: {
      fontWeight: "300",
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
