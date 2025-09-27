import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UpgradeInfoWrapper = styled(Box)(() => ({
  height: '100%',
  overflow: 'auto',
}));

export const StyledContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.secondary.dark}`,
}));
