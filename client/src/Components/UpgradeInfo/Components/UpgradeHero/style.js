import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LeftColumn = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

export const RightColumn = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  fontWeight: 700,
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}));

export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));
