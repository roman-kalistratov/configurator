import { Box, Divider, Stack, Typography } from '@mui/material';
import ActionButton from './ActionButton/ActionButton';
import ControlButtons from './ControlButtons/ControlButtons';
import ProgressImage from './ProgressImage/ProgressImage';
import { formatPrice } from '@/utils/formatPrice';
import GlobalLoading from '../Loading/GlobalLoading';
import Configuration from './Configuration/Configuration';

const Summary = () => {
  const number = 12400;
  return (
    <Stack spacing={3}>
      <GlobalLoading />
      <ProgressImage />
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h1'>Final Price:</Typography>
        <Typography variant='h1'>₪{formatPrice(number)}</Typography>
      </Stack>
      <ActionButton />
      <ControlButtons />
      <Divider sx={{ borderBottomWidth: 2 }}>
        <Typography variant='h2' align='center'>
          Configuration
        </Typography>
      </Divider>
      <Box>
        <Configuration />
      </Box>
    </Stack>
  );
};

export default Summary;
