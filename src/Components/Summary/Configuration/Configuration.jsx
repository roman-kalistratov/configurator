import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { parts } from '../../../parts.json';

const Configuration = () => {
  const selectedUpgrades = useSelector(
    (state) => state.filters.selectedUpgrades
  );

  return (
    <>
      {selectedUpgrades.map((upgrade, index) => {
        const part = parts.find((p) => p.idnt === upgrade.partIdnt);

        return (
          <Box key={index} mb={2}>
            <Typography variant='h2'>
              {part ? part.title : 'Неизвестная категория'}
            </Typography>
            <Typography variant='body1'>{upgrade.name}</Typography>
          </Box>
        );
      })}
    </>
  );
};

export default Configuration;
