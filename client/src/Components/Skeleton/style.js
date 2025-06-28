import { AppBar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FiltersContainer = styled(Box)(
  ({ theme, overflowy = 'auto' }) => ({
    flexBasis: '20%',
    minWidth: '320px',
    height: 'calc(95vh - 144px)',
    border: `1px solid ${theme.palette.secondary.dark}`,
    overflowY: overflowy,
  })
);

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  background: theme.palette.background.paper,
}));
