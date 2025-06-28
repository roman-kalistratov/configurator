import { Box } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

export const UpgradesContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  height: '100%',
  overflowY: 'auto',
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
