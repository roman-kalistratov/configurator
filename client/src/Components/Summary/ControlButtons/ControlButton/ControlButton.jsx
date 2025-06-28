import { Box, Typography } from "@mui/material"
import { StyledButton } from "./styles"

const ControlButton = ({ icon, label, onClick }) => {
  return (
    <StyledButton variant="outlined" onClick={onClick}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {icon}
        <Typography variant="body1" textTransform="capitalize">
          {label}
        </Typography>
      </Box>
    </StyledButton>
  )
}

export default ControlButton
