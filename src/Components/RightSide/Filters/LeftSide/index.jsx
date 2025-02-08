import { useSelector, useDispatch } from "react-redux"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { setFilter } from "../../../../redux/slices/filtersStateSlice"

const LeftSide = () => {
  const filtersByPart = useSelector((state) => state.filters.filters)
  const selectedFilters = useSelector((state) => state.filters.selectedFilters)
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleCheckboxChange = (filter) => {
    dispatch(setFilter(filter))
  }

  return (
    <Box
      sx={{
        flexBasis: "20%",
        height: "calc(95vh - 144px)",
        border: `1px solid ${theme.palette.secondary.dark}`,
        overflowY: "auto",
      }}
    >
      {Object.entries(filtersByPart).map(([key, { title, filters }]) => (
        <Accordion
          key={key}
          sx={{
            boxShadow: "none",
            margin: "0 !important",
          }}
          defaultExpanded
        >
          <AccordionSummary
            sx={{
              borderBottom: `1px solid ${theme.palette.secondary.dark}`,
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h2">
              {title}{" "}
              <Typography component="span" variant="body2">
                (
                {
                  selectedFilters.filter((selectedFilter) =>
                    filters.some((filter) => filter.tag === selectedFilter.tag)
                  ).length
                }{" "}
                selected)
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: "8px 20px" }}>
            <Stack>
              {filters.map((filter, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedFilters.some(
                        (selectedFilter) => selectedFilter.tag === filter.tag
                      )}
                      onChange={() => handleCheckboxChange(filter)}
                    />
                  }
                  label={filter.name}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default LeftSide
