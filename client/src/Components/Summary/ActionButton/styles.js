import { Button, styled } from "@mui/material"

export const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "inherit",
  padding: theme.spacing(1.5),
}))
