// ModalStyles.js
import { IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeaderStack = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  gap: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  marginTop: '4px',
  '&:hover': {
    color: theme.palette.primary.dark,
    background: 'unset',
  },
}));
