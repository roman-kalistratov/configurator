import { Box, Container, Stack, useTheme } from "@mui/material"
import Parts from "./Components/Parts"
import RightSide from "./Components/RightSide"
import Updates from "./Components/Updates"

const App = () => {
  const theme = useTheme()
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ width: "100%", maxWidth: "1200px", height: "800px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            width: "25%",
            height: "100%",
          }}
        >
          <Parts />
        </Box>
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Updates />
        </Box>
        <Box
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            width: "25%",
            height: "100%",
          }}
        >
          <RightSide />
        </Box>
      </Stack>
    </Container>
  )
}

export default App
