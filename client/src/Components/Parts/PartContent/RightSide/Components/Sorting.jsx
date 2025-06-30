import { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Sorting = () => {
  const theme = useTheme();
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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              p: 1,
            },
          },
        }}
      >
        <MenuItem onClick={() => handlePriceSort('default')}>
          По популярности
        </MenuItem>
        <MenuItem onClick={() => handlePriceSort('asc')}>
          Цена: от низкой к высокой
        </MenuItem>
        <MenuItem onClick={() => handlePriceSort('desc')}>
          Цена: от высокой к низкой
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Sorting;
