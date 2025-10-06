// ModalStyles.js
import { IconButton, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  maxWidth: '1650px',
  height: '95dvh',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  padding: theme.spacing(4),
  boxShadow: 'none',
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
}));

export const HeaderStack = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  paddingTop: theme.spacing(1.3),
  '&:hover': {
    color: theme.palette.primary.dark,
    background: 'unset',
  },
}));
