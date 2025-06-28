// styles.js
import { Box, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFormControl = styled(FormControlLabel)(({ theme }) => ({
  width: '100%',
  margin: 0,
  border: `1px solid ${theme.palette.secondary.dark}`,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  '& .MuiFormControlLabel-label': {
    flexGrow: 1,
  },
  '&:hover': {
    borderColor: theme.palette.primary.dark,
  },
}));

export const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});
