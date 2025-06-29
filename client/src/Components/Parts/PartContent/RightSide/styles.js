import { AppBar, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  background: theme.palette.background.paper,
}));
