import { setPart } from "@/redux/slices/filtersStateSlice"
import { openModal } from "@/redux/slices/modalStateSlice"
import AddIcon from "@mui/icons-material/Add"
import { IconButton, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ProductsTypography, StyledStack, TitleTypography } from "./styles"

const PartItem = ({ item }) => {
  const dispatch = useDispatch()
  const part = useSelector((state) => state.filters.part)

  const selectedPart = (part) => {
    dispatch(setPart(part))
    dispatch(openModal())
  }

  return (
    <StyledStack
      direction="row"
      spacing={2}
      isSelected={item.idnt === part}
      onClick={() => selectedPart(item)}
    >
      <Stack direction="row" alignItems="center">
        <TitleTypography variant="h2">{item.title}</TitleTypography>

        <ProductsTypography variant="body1">1345 products</ProductsTypography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography
          variant="h2"
          color="primary.main"
          sx={{ whiteSpace: "nowrap" }}
        >
          Choose
        </Typography>
        <IconButton color="primary" sx={{ pt: 1.2 }}>
          <AddIcon />
        </IconButton>
      </Stack>
    </StyledStack>
  )
}

export default PartItem
