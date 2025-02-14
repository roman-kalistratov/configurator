import { Box, Container, Stack, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import Filters from "./Components/Filters/Filters"
import ModalContent from "./Components/Modal/ModalContent"
import Parts from "./Components/Parts/Parts"
import Summary from "./Components/Summary/Summary"

const App = () => {
  const theme = useTheme()
  const part = useSelector((state) => state.filters.part)

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Stack
          direction="row"
          spacing={3}
          sx={{ width: "100%", position: "relative" }}
          alignItems="flex-start"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Parts />
          </Box>

          <Box
            sx={{
              width: "33.3333%",
              border: `1px solid ${theme.palette.secondary.dark}`,
              p: "2rem",
              position: "sticky",
              top: 0,
            }}
          >
            <Summary />
          </Box>
        </Stack>
      </Container>

      <ModalContent title={part.title}>
        <Filters />
      </ModalContent>
    </>
  )
}

export default App
