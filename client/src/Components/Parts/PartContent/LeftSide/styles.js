import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FiltersContainer = styled(Box)(
  ({ theme, overflowy = 'auto' }) => ({
    flexBasis: '20%',
    minWidth: '320px',
    height: '100%',
    border: `1px solid ${theme.palette.secondary.dark}`,
    overflowY: overflowy,
  }),
);
