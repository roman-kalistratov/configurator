import { Box, CircularProgress, Fade } from '@mui/material';
import { useSelector } from 'react-redux';

const PartLoading = ({ height = '100%', width = '100%' }) => {
  const partLoading = useSelector((state) => state.loading.part);

  return (
    <Fade in={partLoading} unmountOnExit>
      <Box
        sx={{
          position: 'relative',
          height,
          width,
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <CircularProgress />
      </Box>
    </Fade>
  );
};

export default PartLoading;
