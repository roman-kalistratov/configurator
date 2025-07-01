import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import Search from './Components/Search/Search';
import Upgrades from './Components/Upgrades/Upgrades';
import { useSelector } from 'react-redux';
import SelectedFilters from './Components/SelectedFilters/SelectedFilters';
import Sorting from './Components/Sorting';
import ViewButtons from './Components/ViewButtons';
import { useState } from 'react';

const RightSide = () => {
  const theme = useTheme();
  const selectedPartIdnt = useSelector((state) => state.part.selectedPart.idnt);
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'black',
          border: `1px solid ${theme.palette.secondary.dark}`,
        }}
      >
        <Sorting sortOrder={sortOrder} setSortOrder={setSortOrder} />

        <Search />

        <ViewButtons />
      </Box>

      <SelectedFilters partIdnt={selectedPartIdnt} />

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          border: `1px solid ${theme.palette.secondary.dark}`,
        }}
      >
        <Upgrades partidnt={selectedPartIdnt} sort={sortOrder} />
      </Box>
    </Box>
  );
};

export default RightSide;
