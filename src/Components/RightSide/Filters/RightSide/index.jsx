import { useTheme } from "@emotion/react"
import {
  AppBar,
  Box,
  Checkbox,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Button,
  FormControlLabel,
  Stack,
  Chip,
} from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import { removeFilter } from "../../../../redux/slices/filtersStateSlice"

const RightSide = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const partItems = useSelector((state) => state.filters.partItems)
  const selectedFilters = useSelector((state) => state.filters.selectedFilters)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = () => {
    console.log("Searching for:", searchTerm)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(95vh - 144px)",
        border: `1px solid ${theme.palette.secondary.dark}`,
        overflowY: "auto",
      }}
    >
      <AppBar
        position="sticky"
        sx={{ top: 0, background: `#EDF1F4`, opacity: 1 }}
      >
        <Toolbar>
          <TextField
            label="Поиск по товарам"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginLeft: 1 }}
          >
            Search
          </Button>
        </Toolbar>

        {selectedFilters && (
          <Stack
            direction="row"
            p="0 0 16px 16px"
            gap={1}
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            {selectedFilters.map((chip, index) => (
              <Chip
                key={index}
                label={`${chip.parentName}:${chip.name}`}
                onDelete={() => dispatch(removeFilter(chip.tag))}
              />
            ))}
          </Stack>
        )}
      </AppBar>

      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {Object.entries(partItems).map(([itemKey, item]) => (
          <FormControlLabel
            key={itemKey}
            control={<Checkbox color="primary" />}
            sx={{
              border: `1px solid ${theme.palette.secondary.dark}`,
              padding: 1,
              "& .MuiFormControlLabel-label": {
                flexGrow: 1,
              },
            }}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="https://ksp.co.il/shop/items/128/289975.jpg" // Замените на item.url, если у вас есть изображения
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <Box>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2">KSP SKU: {item.uin}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <Typography variant="h6">${item.price}</Typography>
                  <IconButton
                    color="primary"
                    sx={{
                      marginLeft: 1,
                      "&:hover": {
                        background: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            }
          />
        ))}
      </Box>
    </Box>
  )
}

export default RightSide
