import { useTheme } from "@emotion/react"
import { Box } from "@mui/material"
import Search from "./Search/Search"
import SelectedFilters from "./SelectedFilters/SelectedFilters"
import { StyledAppBar } from "./styles"
import Upgrades from "./Upgrades/Upgrades"

const RightSide = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(95vh - 144px)",
        border: `1px solid ${theme.palette.secondary.dark}`,
        overflowY: "auto",
      }}
    >
      <StyledAppBar position="sticky">
        <Search />
        <SelectedFilters />
      </StyledAppBar>

      <Upgrades />
    </Box>
  )
}

export default RightSide
