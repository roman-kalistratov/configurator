import { Box, Skeleton, Stack } from "@mui/material";
import { StyledAppBar } from "../Filters/RightSide/styles";

const ItemsSkeleteon = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(95vh - 144px)",
        border: (theme) => `1px solid ${theme.palette.secondary.dark}`,
        overflowY: "hidden",
      }}
    >
      <StyledAppBar position="sticky" sx={{ p: 2 }}>
        <Stack spacing={2} direction={"row"}>
          <Skeleton
            variant="rectangular"
            height={40}
            width="90%"
            sx={{ mb: 2 }}
          />
          <Skeleton variant="rectangular" height={40} width="10%" />
        </Stack>
      </StyledAppBar>

      <Box sx={{ p: 2 }}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="rectangular"
            height={80}
            sx={{ mb: 2, borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ItemsSkeleteon;
