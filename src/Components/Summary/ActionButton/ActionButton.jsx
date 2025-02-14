import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { StyledButton } from "./styles"

const ActionButton = () => {
  return (
    <StyledButton
      variant="contained"
      startIcon={<ShoppingCartIcon />}
      fullWidth
    >
      Add to cart
    </StyledButton>
  )
}

export default ActionButton
