import { useTheme } from "@emotion/react"
import { Button, Toolbar } from "@mui/material"
import { useState } from "react"
import { StyledTextField } from "./styles"

const Search = () => {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = () => {
    console.log("Searching for:", searchTerm)
  }

  return (
    <Toolbar>
      <StyledTextField
        label="Quick search..."
        variant="outlined"
        size="small"
        value={searchTerm}
        sx={{ background: theme.palette.background.default }}
        onChange={handleSearchChange}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 1 }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Toolbar>
  )
}

export default Search
