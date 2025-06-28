import { Stack, Typography } from '@mui/material';
import ActionButton from './ActionButton/ActionButton';
import ControlButtons from './ControlButtons/ControlButtons';
import ProgressImage from './ProgressImage/ProgressImage';
import { formatPrice } from '@/utils/formatPrice';
import GlobalLoading from '../Loading/GlobalLoading';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const Summary = () => {
  const selectedUpgrades = useSelector(
    (state) => state.upgrades.selectedUpgrades
  );

  const totalPrice = useMemo(() => {
    return Object.values(selectedUpgrades).reduce((sum, upgrade) => {
      const price = parseFloat(upgrade?.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  }, [selectedUpgrades]);

  return (
    <Stack spacing={3}>
      <GlobalLoading />
      <ProgressImage />
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h1'>Final Price:</Typography>
        <Typography variant='h1'>₪{formatPrice(totalPrice)}</Typography>
      </Stack>
      <ActionButton />
      <ControlButtons />
    </Stack>
  );
};

export default Summary;
