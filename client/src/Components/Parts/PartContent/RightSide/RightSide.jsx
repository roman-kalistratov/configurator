import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import Search from './Components/Search/Search';
import Upgrades from './Components/Upgrades/Upgrades';
import { useSelector } from 'react-redux';
import SelectedFilters from './Components/SelectedFilters/SelectedFilters';
import Sorting from './Components/Sorting';
import ViewButtons from './Components/ViewButtons';

const RightSide = () => {
  const theme = useTheme();
  const selectedPartIdnt = useSelector((state) => state.part.selectedPart.idnt);

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
        {/* sotring */}
        <Sorting />
        {/* sotring end */}

        {/* search */}
        <Search />
        {/* search end */}

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
        <Upgrades partidnt={selectedPartIdnt} />
      </Box>
    </Box>
  );
};

export default RightSide;
