import { removeFilter } from "@/redux/slices/filtersStateSlice"
import { useTheme } from "@emotion/react"
import { Chip, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

const SelectedFilters = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const selectedFilters = useSelector((state) => state.filters.selectedFilters)

  console.log(selectedFilters)

  const groupedData = selectedFilters.reduce((acc, item) => {
    const { parentName } = item
    if (!acc[parentName]) {
      acc[parentName] = []
    }
    acc[parentName].push(item)
    return acc
  }, {})

  return (
    <>
      {selectedFilters.length > 0 && (
        <Stack direction="row" flexWrap="wrap" padding="0 0 16px 16px" gap={1}>
          {Object.entries(groupedData).map(([parentName, items]) => (
            <Stack
              direction="row"
              key={parentName}
              flexWrap="wrap"
              alignItems="center"
              gap={1}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                color={theme.palette.customColors.black}
              >
                {parentName}:
              </Typography>
              {items.map((chip) => (
                <Chip
                  key={chip.tag}
                  label={`${chip.parentName}: ${chip.name}`}
                  onDelete={() => dispatch(removeFilter(chip.tag))}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      )}
    </>
  )
}

export default SelectedFilters
