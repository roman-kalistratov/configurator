import { useState } from 'react';
import {
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const SortMenu = ({ onSortChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (sortType) => {
    onSortChange(sortType);
    handleClose();
  };

  return (
    <Box sx={{ justifySelf: 'flex-end' }}>
      <Button
        variant='outlined'
        sx={{
          minWidth: 120,
        }}
        startIcon={<SortIcon />}
        onClick={handleClick}
      >
        Sort by
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleSort('price_asc')}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText>Price: lowest to highest</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('price_desc')}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText>Price: highest to lowest</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('popular')}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText>Popularity</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('new')}>
          <ListItemIcon>
            <NewReleasesIcon />
          </ListItemIcon>
          <ListItemText>Products: new to old</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SortMenu;
