import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}))
