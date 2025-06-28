import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#007aff',
      dark: '#0B6BB6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FDC70F',
      light: '#EAEAEA',
      dark: '#d7d7d8',
    },
    background: {
      default: '#fff',
      paper: '#EDF1F4',
    },
    customColors: {
      black: 'rgba(0, 0, 0, 0.87)',
      greyLight: 'rgba(215, 245, 255, .2)',
    },
  },
  typography: {
    fontFamily: 'Assistant, sans-serif',
    h1: {
      fontSize: '26px',
      fontWeight: '700',
    },
    h2: {
      fontSize: '20px',
      fontWeight: '600',
    },
    body1: {
      fontWeight: '500',
    },
    body2: {
      fontWeight: '600',
      opacity: 0.6,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          '@media (min-width:600px)': {
            maxWidth: '1650px',
          },
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      black: string;
      greyLight: string;
    };
  }
  interface PaletteOptions {
    customColors: {
      black: string;
      greyLight: string;
    };
  }
}

export default theme;
