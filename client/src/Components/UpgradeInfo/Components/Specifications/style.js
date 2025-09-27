import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SpecificationsTitleWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(2),
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  margin: 'auto',
  fontWeight: 700,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    width: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
}));

export const SpecificationsWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(2),
  background: theme.palette.background.default,
}));

export const SpecificationRow = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(2),
  margin: 'auto',
  width: '50%',

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const StyledText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '15px',
  },
}));
