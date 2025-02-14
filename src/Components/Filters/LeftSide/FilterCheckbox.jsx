import { useTheme } from "@emotion/react"
import { Checkbox, FormControlLabel } from "@mui/material"

const FilterCheckbox = ({ filter, isChecked, onChange }) => {
  const theme = useTheme()
  return (
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={onChange} />}
      label={filter.name}
      sx={{
        "&:hover": {
          background: theme.palette.secondary.dark,
        },
      }}
    />
  )
}

export default FilterCheckbox
