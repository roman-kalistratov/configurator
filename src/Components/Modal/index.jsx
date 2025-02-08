import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../redux/slices/modalStateSlice"
import {
  Backdrop,
  Fade,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import CloseIcon from "@mui/icons-material/Close"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "1650px",
  height: "95dvh",
  backgroundColor: "background.paper",
  border: "none",
  p: 4,
  boxShadow: "none",
  outline: "none",
}

const ModalContent = ({ children, title }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.modal.isOpen)

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
          timeout: 300,
        },
      }}
    >
      <Fade in={isOpen}>
        <Paper sx={style} elevation={0} square>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              border: `1px solid ${theme.palette.secondary.dark}`,
              p: 2,
              mb: 1,
            }}
          >
            <Typography variant="h1">{title}</Typography>

            <IconButton
              color="primary"
              sx={{
                pt: 1.3,
                "&:hover": {
                  color: "primary.dark",
                  background: "unset",
                },
              }}
              onClick={() => dispatch(closeModal())}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h2" sx={{ whiteSpace: "nowrap" }}>
                  Close
                </Typography>
                <CloseIcon />
              </Stack>
            </IconButton>
          </Stack>
          {children}
        </Paper>
      </Fade>
    </Modal>
  )
}

export default ModalContent
