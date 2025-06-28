import { IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({ theme }) => ({
  alignItems: 'center',
  padding: '1rem 1.3rem',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.secondary.dark}`,
  transition: 'background-color 0.1s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));

export const TitleTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  minWidth: '250px',
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  borderRadius: 0,
}));
