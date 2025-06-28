import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  padding: theme.spacing(2),
  borderColor: theme.palette.secondary.dark,
  background: theme.palette.secondary.dark,
  color: "inherit",
  width: "100%",
}))
