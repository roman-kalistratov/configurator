import { Stack, Typography } from "@mui/material"
import ActionButton from "./ActionButton/ActionButton"
import ControlButtons from "./ControlButtons/ControlButtons"
import ProgressImage from "./ProgressImage/ProgressImage"

const Summary = () => {
  return (
    <Stack spacing={3}>
      <ProgressImage />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h1">Final Price:</Typography>
        <Typography variant="h1">12400₪</Typography>
      </Stack>
      <ActionButton />
      <ControlButtons />
    </Stack>
  )
}

export default Summary
