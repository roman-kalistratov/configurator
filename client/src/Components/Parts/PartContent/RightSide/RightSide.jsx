import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Box, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import Search from './Search/Search';
import Upgrades from './Upgrades/Upgrades';
import { useDispatch, useSelector } from 'react-redux';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FilterListIcon from '@mui/icons-material/FilterList';
import { setView } from '@/redux/slices/viewStateSlice';
import SelectedFilters from './SelectedFilters/SelectedFilters';

const RightSide = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedPartIdnt = useSelector((state) => state.part.selectedPart.idnt);
  const viewType = useSelector((state) => state.view.listView);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePriceSort = (type) => {
    console.log('Выбран фильтр по цене:', type);
    // dispatch или setState для сортировки по типу: 'asc', 'desc', 'default'
    handleClose();
  };

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
        <Box
          sx={{
            borderRight: `1px solid ${theme.palette.secondary.dark}`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
          px={2}
        >
          <Tooltip title="Фильтр по цене">
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handlePriceSort('default')}>
              По умолчанию
            </MenuItem>
            <MenuItem onClick={() => handlePriceSort('asc')}>
              Сначала дешевые
            </MenuItem>
            <MenuItem onClick={() => handlePriceSort('desc')}>
              Сначала дорогие
            </MenuItem>
          </Menu>
        </Box>
        <Search />
        <Stack
          direction="row"
          justifyContent="center"
          px={2}
          sx={{
            borderLeft: `1px solid ${theme.palette.secondary.dark}`,
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Tooltip title="Отобразить списком">
            <IconButton onClick={() => dispatch(setView(true))}>
              <FormatListBulletedIcon
                sx={{
                  fontSize: 26,
                  cursor: 'pointer',
                  color: viewType && theme.palette.primary.main,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Отобразить сеткой">
            <IconButton onClick={() => dispatch(setView(false))}>
              <GridViewIcon
                sx={{
                  fontSize: 26,
                  cursor: 'pointer',
                  color: !viewType && theme.palette.primary.main,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{ border: `1px solid ${theme.palette.secondary.dark}` }}>
        <SelectedFilters partIdnt={selectedPartIdnt} />
      </Box>

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
