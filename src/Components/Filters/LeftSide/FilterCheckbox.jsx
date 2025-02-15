import { useTheme } from "@emotion/react"
import { Checkbox, FormControlLabel } from "@mui/material"
import { memo, useCallback } from "react"

const FilterCheckbox = ({
  tag,
  name,
  isChecked,
  onChange,
  parentKey,
  parentTitle,
}) => {
  const theme = useTheme()

  console.log(`Rendering FilterCheckbox: ${name}`)

  // Функция `onChange` теперь стабильна, так как передается `tag`, а не объект
  const handleChange = useCallback(() => {
    onChange(tag, parentKey, parentTitle)
  }, [onChange, tag, parentKey, parentTitle])

  return (
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={handleChange} />}
      label={name}
      sx={{
        "&:hover": {
          background: theme.palette.secondary.dark,
        },
      }}
    />
  )
}

export default memo(FilterCheckbox)
