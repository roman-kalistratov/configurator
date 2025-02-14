import { Box, Typography } from "@mui/material"
import { StyledButton } from "./styles"

const ControlButton = ({ icon, label }) => {
  return (
    <StyledButton variant="outlined">
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
