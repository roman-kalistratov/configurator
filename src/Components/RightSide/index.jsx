import { Box, Button, Stack, Typography, useTheme } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SaveIcon from "@mui/icons-material/Save"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import PrintIcon from "@mui/icons-material/Print"
import UploadIcon from "@mui/icons-material/Upload"

const RightSide = () => {
  const theme = useTheme()
  return (
    <Stack spacing={3}>
      <img
        src="https://img.ksp.co.il/item/16014/b_3.jpg?v=1547542303"
        width="80%"
        style={{ margin: "auto" }}
        alt=""
        loading="lazy"
      />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h1">Final Price:</Typography>
        <Typography variant="h1">12400₪</Typography>
      </Stack>
      <Button
        variant="contained"
        startIcon={<ShoppingCartIcon />}
        sx={{
          background: theme.palette.secondary.main,
          color: "inherit",
          py: 2,
        }}
        fullWidth
      >
        Add to cart
      </Button>
      <Stack spacing={1} direction="row">
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 0,
            paddingY: 2,
            borderColor: theme.palette.secondary.dark,
            background: theme.palette.secondary.dark,
            color: "inherit",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <SaveIcon />
            <Typography variant="body1" textTransform="capitalize">
              Save
            </Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 0,
            paddingY: 2,
            borderColor: theme.palette.secondary.dark,
            background: theme.palette.secondary.dark,
            color: "inherit",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <RestartAltIcon />
            <Typography variant="body1" textTransform="capitalize">
              Reset
            </Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 0,
            paddingY: 2,
            borderColor: theme.palette.secondary.dark,
            background: theme.palette.secondary.dark,
            color: "inherit",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <PrintIcon />
            <Typography variant="body1" textTransform="capitalize">
              Print
            </Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 0,
            paddingY: 2,
            borderColor: theme.palette.secondary.dark,
            background: theme.palette.secondary.dark,
            color: "inherit",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <UploadIcon />
            <Typography variant="body1" textTransform="capitalize">
              Code
            </Typography>
          </Box>
        </Button>
      </Stack>
    </Stack>
  )
}

export default RightSide
