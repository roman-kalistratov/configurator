import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import Search from './Search/Search';
import { StyledAppBar } from './styles';
import SelectedFilters from './SelectedFilters/SelectedFilters';
import Upgrades from './Upgrades/Upgrades';
import { useSelector } from 'react-redux';

const RightSide = () => {
  const theme = useTheme();
  const selectedPartIdnt = useSelector((state) => state.part.selectedPart.idnt);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        border: `1px solid ${theme.palette.secondary.dark}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <StyledAppBar position="sticky">
          <Search />
          <SelectedFilters partIdnt={selectedPartIdnt} />
        </StyledAppBar>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Upgrades partidnt={selectedPartIdnt} />
      </Box>
    </Box>
  );
};

export default RightSide;
