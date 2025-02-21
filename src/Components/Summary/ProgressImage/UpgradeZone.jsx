import { setPart } from "@/redux/slices/filtersStateSlice"
import { openModal } from "@/redux/slices/modalStateSlice"
import { useTheme } from "@emotion/react"
import AddIcon from "@mui/icons-material/Add"
import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const UpgradeZone = ({
  idnt,
  left,
  top,
  width,
  height,
  title,
  imageUrl,
  zIndex = 1,
  isCase = false,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [hovered, setHovered] = useState(false)
  const selectedUpgrades = useSelector(
    (state) => state.filters.selectedUpgrades
  )

  const selectedPart = (part) => {
    dispatch(setPart(part))
    dispatch(openModal())
  }

  const upgrade = selectedUpgrades?.find((upgrade) => upgrade.partIdnt === idnt)

  return (
    <Box
      sx={{
        width: width,
        height: height,
        position: "absolute",
        top: top,
        left: left,
        cursor: "pointer",
        border: "1px solid transparent",
        borderRadius: "5px",
        zIndex,
        background:
          upgrade && imageUrl
            ? `url(${imageUrl}) no-repeat center / 100% 100%`
            : "none",
        "&:hover": {
          outline: !upgrade && ".0625rem solid rgb(126, 118, 118)",
          borderRadius: "5px",
          background:
            upgrade && imageUrl
              ? `url(${imageUrl}) no-repeat center / 100% 100%`
              : theme.palette.customColors.greyLight,
        },
      }}
      onClick={() => selectedPart({ idnt })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {upgrade && (
        <Typography
          variant="body2"
          fontSize={12}
          sx={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.1s ease",
            whiteSpace: "nowrap",
            color: "white",
            position: "absolute",
            left: isCase ? "12%" : "8%",
            top: isCase ? "2%" : "1%",
          }}
        >
          {title}
        </Typography>
      )}
      {!upgrade && (
        <Box
          position="absolute"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: hovered ? "12px" : "50%",
            padding: "0.2rem 0.255rem",
            cursor: "pointer",
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <AddIcon
            sx={{ color: theme.palette.primary.contrastText, fontSize: "12px" }}
          />
          <Box
            sx={{
              overflow: "hidden",
              maxWidth: hovered ? "40px" : "0px",
              marginLeft: hovered ? "2px" : "0px",
            }}
          >
            <Typography
              variant="body2"
              fontSize={10}
              sx={{
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.1s ease",
                whiteSpace: "nowrap",
                color: "white",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default UpgradeZone
