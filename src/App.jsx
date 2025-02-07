import { Box, Container, Paper, Stack } from "@mui/material"
import Parts from "./Components/Parts"
import RightSide from "./Components/RightSide"
import Updates from "./Components/Updates"

const App = () => {
  return (
    <Container
      maxWidth="lg"
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
        sx={{ width: "100%", height: "800px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          elevation={4}
          sx={{
            width: "20%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <Parts />
        </Paper>
        <Box sx={{ width: "calc(100% - 40% - 16px)", height: "100%" }}>
          <Updates />
        </Box>
        <Paper
          elevation={4}
          sx={{
            width: "20%",
            height: "100%",
          }}
        >
          <RightSide />
        </Paper>
      </Stack>
    </Container>
  )
}

export default App
