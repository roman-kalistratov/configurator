import data from "../../parts.json"
import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { GiProcessor } from "react-icons/gi"
import { useDispatch } from "react-redux"
import { setPart } from "../../redux/slices/filtersStateSlice"

const Parts = () => {
  const [parts, setParts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setParts(data.parts)
  }, [])

  const selectedPart = (idnt) => {
    dispatch(setPart(idnt))
  }

  return (
    <>
      {parts.map((part) => (
        <Stack
          key={part.idnt}
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            p: "10px 8px",
            cursor: "pointer",
            transition: "background-color 0.1s ease",
            "&:hover": {
              backgroundColor: "secondary.dark",
              color: "primary.contrastText",
            },
          }}
          onClick={() => selectedPart(part.idnt)}
        >
          <GiProcessor style={{ fontSize: "24px" }} />
          <Typography variant="h2">{part.title}</Typography>
        </Stack>
      ))}
    </>
  )
}

export default Parts
