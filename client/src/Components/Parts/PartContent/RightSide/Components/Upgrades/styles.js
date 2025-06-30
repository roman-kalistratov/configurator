import { Box } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

export const UpgradesContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  height: '100%',
  overflowY: 'auto',
}));

export const UpgradesWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'viewTypeList',
})(({ theme, viewTypeList }) => ({
  height: '100%',
  overflowY: 'auto',
  paddingBottom: theme.spacing(2),
  ...(!viewTypeList && {
    //display type grid
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'repeat(3, 1fr)',
  }),
}));

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const LoadingWrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: `${fadeIn} 0.3s ease-in-out`,
  pointerEvents: 'none',
});

export const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});
