// styles.js
import { Box, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFormControl = styled(FormControlLabel)(({ theme }) => ({
  width: '100%',
  margin: 0,
  border: `1px solid ${theme.palette.secondary.dark}`,
  backgroundColor: theme.palette.background.default,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  padding: theme.spacing(1),
  gap: 5,
  '& .MuiFormControlLabel-label': {
    flexGrow: 1,
  },
  '&:hover': {
    borderColor: theme.palette.primary.dark,
  },
}));

export const LabelWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'viewTypeList',
})(({ theme, viewTypeList }) => ({
  display: 'flex',
  alignItems: 'center',
  ...(!viewTypeList && {
    //display type grid
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${theme.spacing(2)} 0`,
  }),
}));

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'viewTypeList',
})(({ theme, viewTypeList }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  ...(!viewTypeList && {
    //display type grid
    flexDirection: 'column',
  }),
}));

export const PriceContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'viewTypeList',
})(({ theme, viewTypeList }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  ...(!viewTypeList && {
    //display type grid
    marginLeft: 0,
  }),
}));
