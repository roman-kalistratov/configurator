import { Stack, Typography } from "@mui/material";
import ActionButton from "./ActionButton/ActionButton";
import ControlButtons from "./ControlButtons/ControlButtons";
import ProgressImage from "./ProgressImage/ProgressImage";
import { formatPrice } from "@/utils/formatPrice";

const Summary = () => {
  const number = 12400;
  return (
    <Stack spacing={3}>
      <ProgressImage />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h1">Final Price:</Typography>
        <Typography variant="h1">₪{formatPrice(number)}</Typography>
      </Stack>
      <ActionButton />
      <ControlButtons />
    </Stack>
  );
};

export default Summary;
