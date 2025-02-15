import { removeUpgrade, setPart } from "@/redux/slices/filtersStateSlice"
import { openModal } from "@/redux/slices/modalStateSlice"
import AddIcon from "@mui/icons-material/Add"
import CachedIcon from "@mui/icons-material/Cached"
import CloseIcon from "@mui/icons-material/Close"
import LinkIcon from "@mui/icons-material/Link"
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  ProductsTypography,
  StyledIconButton,
  StyledStack,
  TitleTypography,
} from "./styles"

const PartItem = ({ item }) => {
  const dispatch = useDispatch()
  const part = useSelector((state) => state.filters.part)
  const selectedUpgrades = useSelector(
    (state) => state.filters.selectedUpgrades
  )

  const selectedPart = (part) => {
    dispatch(setPart(part))
    dispatch(openModal())
  }

  const upgrade = selectedUpgrades?.find(
    (upgrade) => upgrade.partIdnt === item.idnt
  )

  return (
    <StyledStack
      direction="row"
      isSelected={item.idnt === part}
      onClick={() => selectedPart(item)}
    >
      <Stack direction="row" alignItems="center">
        <TitleTypography variant="h2">{item.title}</TitleTypography>
        {!upgrade && (
          <ProductsTypography variant="body1">1345 products</ProductsTypography>
        )}
      </Stack>

      {upgrade ? (
        <>
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              src="https://ksp.co.il/shop/items/128/289975.jpg"
              alt={upgrade.name}
              style={{
                width: 40,
                height: 40,
                objectFit: "cover",
              }}
            />
            <Stack>
              <Typography variant="h2" fontSize={16}>
                {upgrade.name}
              </Typography>
              <Typography variant="body2">KSP SPU:{upgrade.uin}</Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: "auto" }}
          >
            <Box width={110}>
              <Typography
                variant="h2"
                fontSize={16}
                align="left"
                sx={{ marginRight: "20px" }}
              >
                Price: {upgrade.price}₪
              </Typography>
            </Box>

            <Tooltip title="switch">
              <StyledIconButton>
                <CachedIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="link">
              <StyledIconButton>
                <LinkIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="remove">
              <StyledIconButton
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(removeUpgrade(item.idnt))
                }}
              >
                <CloseIcon />
              </StyledIconButton>
            </Tooltip>
          </Stack>
        </>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ ml: "auto" }}
        >
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
      )}
    </StyledStack>
  )
}

export default PartItem
