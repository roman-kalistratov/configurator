import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress, Fade } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';

const GlobalLoading = () => {
  const theme = useTheme();
  const globalLoading = useSelector((state) => state.loading.global);

  useEffect(() => {
    if (globalLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [globalLoading]);

  return (
    <Backdrop
      open={globalLoading}
      sx={{
        color: theme.palette.primary.contrastText,
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Fade in={globalLoading} timeout={400}>
        <CircularProgress color='inherit' />
      </Fade>
    </Backdrop>
  );
};

export default GlobalLoading;
