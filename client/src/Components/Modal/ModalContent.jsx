import { closeModal } from '@/redux/slices/modalStateSlice';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Fade, Modal, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CloseButton, HeaderStack, StyledPaper } from './styles';

const ModalContent = ({ children, title }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 100,
        },
      }}
    >
      <Fade in={isOpen}>
        <StyledPaper elevation={0} square>
          <HeaderStack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h1">{title}</Typography>

            <CloseButton color="primary" onClick={() => dispatch(closeModal())}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h2" whiteSpace="nowrap">
                  Close
                </Typography>
                <CloseIcon />
              </Stack>
            </CloseButton>
          </HeaderStack>

          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            {children}
          </Box>
        </StyledPaper>
      </Fade>
    </Modal>
  );
};

export default ModalContent;
