import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

export const UpgradesContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}))
