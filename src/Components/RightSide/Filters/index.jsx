import { Stack } from "@mui/material"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

const Filters = () => {
  return (
    <Stack direction="row" spacing={3}>
      <LeftSide />
      <RightSide />
    </Stack>
  )
}

export default Filters
