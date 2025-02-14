import AddIcon from "@mui/icons-material/Add"
import { Box, Checkbox, Typography } from "@mui/material"
import { PriceContainer, StyledBox, StyledFormControl } from "./styles"

const UpgradeItem = ({ item }) => {
  return (
    <StyledFormControl
      control={<Checkbox color="primary" />}
      label={
        <StyledBox>
          <StyledBox>
            <img
              src="https://ksp.co.il/shop/items/128/289975.jpg"
              alt={item.name}
              style={{
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
            />
            <Box>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2">KSP SKU: {item.uin}</Typography>
            </Box>
          </StyledBox>
          <PriceContainer>
            <Typography variant="h2">${item.price}</Typography>
            <AddIcon color="primary" sx={{ marginLeft: 1 }} />
          </PriceContainer>
        </StyledBox>
      }
    />
  )
}

export default UpgradeItem
