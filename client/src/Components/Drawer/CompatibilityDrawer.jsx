import { memo } from 'react';
import TopDrawer from '../Drawer/TopDrawer';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

const CompatibilityDrawer = ({ open, onClose, errors = [] }) => {
  if (!errors.length) return null;

  return (
    <TopDrawer open={open} onClose={onClose}>
      <Box>
        <Typography variant="h2">Обнаружены проблемы совместимости</Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body1">
          Следующие комплектующие несовместимы:
        </Typography>
        <List dense>
          {errors.map((err, i) => (
            <ListItem key={i} disableGutters>
              <Typography variant="body1">{err}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </TopDrawer>
  );
};

export default memo(CompatibilityDrawer);
