import data from "../../parts.json"
import { Stack, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPart } from "../../redux/slices/filtersStateSlice"
import { IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

const Parts = () => {
  const [parts, setParts] = useState([])
  const dispatch = useDispatch()
  const part = useSelector((state) => state.filters.part)
  const theme = useTheme()

  useEffect(() => {
    setParts(data.parts)
  }, [])

  const selectedPart = (idnt) => {
    dispatch(setPart(idnt))
  }

  return (
    <>
      {parts.map((item) => (
        <Stack
          key={item.idnt}
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: "1.7rem",
            cursor: "pointer",
            border: `1px solid ${theme.palette.secondary.dark}`,
            transition: "background-color 0.1s ease",
            backgroundColor: `${
              item.idnt === part ? theme.palette.secondary.dark : "inherit"
            }`,
            "&:hover": {
              backgroundColor: "secondary.light",
            },
            "&:not(:last-child)": {
              mb: 2,
            },
          }}
          onClick={() => selectedPart(item.idnt)}
        >
          <Stack direction="row" alignItems="center">
            <Typography
              variant="h2"
              sx={{
                whiteSpace: "nowrap",
                width: "600px",
              }}
            >
              {item.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                whiteSpace: "nowrap",
                opacity: 0.6,
                mr: "50%",
                flexGrow: 1,
              }}
            >
              1345 products
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="h2"
              color="primary.main"
              sx={{ whiteSpace: "nowrap" }}
            >
              Choose
            </Typography>
            <IconButton color="primary" sx={{ pt: 1.3 }}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </>
  )
}

export default Parts
