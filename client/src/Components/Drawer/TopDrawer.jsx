import { Drawer, Slide, Box } from '@mui/material';

function TopDrawer({ open, onClose, children }) {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        root: {
          sx: {
            zIndex: 1500, // чтобы поверх других модалок
          },
        },
        paper: {
          sx: {
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            top: 50,
            width: 'max-content', // или другая желаемая ширина
            maxWidth: '50vw', // адаптивно
            height: 'auto',
          },
        },
      }}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box sx={{ p: 2 }}>{children}</Box>
      </Slide>
    </Drawer>
  );
}

export default TopDrawer;
