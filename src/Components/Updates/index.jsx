import React, { useEffect, useState, useMemo, useCallback } from "react"
import { Box, Chip, Paper, Stack, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import ViewListIcon from "@mui/icons-material/ViewList"
import GridViewIcon from "@mui/icons-material/GridView"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../../redux/slices/filtersStateSlice"

const Updates = () => {
  const theme = useTheme()
  const filtersByPart = useSelector((state) => state.filters.filters)
  const part = useSelector((state) => state.filters.part)
  const partItems = useSelector((state) => state.filters.partItems)
  const selectedFilters = useSelector((state) => state.filters.selectedFilters)
  const [views, setViews] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (filtersByPart) {
      const initialViews = Object.keys(filtersByPart).reduce((acc, key) => {
        acc[key] = "list"
        return acc
      }, {})
      setViews(initialViews)
    }
  }, [filtersByPart])

  const filterPartItems = (partItems, selectedFilters) => {
    if (selectedFilters.length === 0) {
      return partItems
    }
    return Object.fromEntries(
      Object.entries(partItems).filter(([, item]) => {
        return selectedFilters.some((filterTag) => {
          return Object.values(item.tags).some((tagArray) =>
            tagArray.includes(filterTag)
          )
        })
      })
    )
  }

  const filteredPartItems = useMemo(() => {
    return filterPartItems(partItems, selectedFilters)
  }, [partItems, selectedFilters])

  const selectFilter = useCallback(
    (filter) => {
      dispatch(setFilter(filter))
    },
    [dispatch]
  )

  const toggleView = useCallback((key, newView) => {
    setViews((prevViews) => ({
      ...prevViews,
      [key]: newView,
    }))
  }, [])

  const hasFilters = useMemo(
    () =>
      part !== null &&
      part !== undefined &&
      Object.keys(filtersByPart).length > 0,
    [part, filtersByPart]
  )

  return (
    <>
      {!hasFilters ? (
        <Paper elevation={1}>
          <Chip
            label="Select a part to view filters."
            sx={{
              borderRadius: 0,
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              background: "none",
              transition: "background-color 0.1s ease",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          />
        </Paper>
      ) : (
        Object.entries(filtersByPart).map(([key, { title, filters }]) => (
          <React.Fragment key={key}>
            <Typography variant="h2" sx={{ pX: 2, pb: 1 }}>
              {title}
            </Typography>
            <Paper sx={{ mb: 2 }} elevation={1}>
              <Stack direction="row" alignItems="center">
                <Chip
                  label="ALL"
                  sx={{
                    borderRadius: 0,
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    background: "none",
                    transition: "background-color 0.1s ease",
                    "&:hover": {
                      color: "primary.dark",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {filters.map((filter, index) => (
                    <Chip
                      key={index}
                      label={filter.name}
                      sx={{
                        height: "auto",
                        p: 1.4,
                        borderRadius: 0,
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.1s ease",
                        background: selectedFilters.includes(filter.tag)
                          ? theme.palette.secondary.main
                          : "inherit",
                        "&:hover": {
                          backgroundColor: "secondary.main",
                        },
                      }}
                      onClick={() => selectFilter(filter)}
                    />
                  ))}
                </Box>
                <Stack
                  direction="row"
                  spacing={1}
                  px={1.4}
                  alignItems="center"
                  ml="auto"
                >
                  <ViewListIcon
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      color:
                        views[key] === "list" ? "primary.light" : "inherit",
                    }}
                    onClick={() => toggleView(key, "list")}
                  />
                  <GridViewIcon
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      color:
                        views[key] === "grid" ? "primary.light" : "inherit",
                    }}
                    onClick={() => toggleView(key, "grid")}
                  />
                </Stack>
              </Stack>
            </Paper>
          </React.Fragment>
        ))
      )}
      <Box>
        {Object.entries(filteredPartItems).map(([itemKey, item]) => (
          <Stack
            direction="row"
            key={itemKey}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            py={2}
            sx={{ borderBottom: `1px solid ${theme.palette.secondary.dark}` }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <img
                src="https://ksp.co.il/shop/items/128/337558.jpg"
                alt="item_img"
                width={70}
              />
              <Typography variant="body1">{item.name}</Typography>
            </Stack>
            <Typography variant="h2" sx={{ whiteSpace: "nowrap" }}>
              {item.price}₪
            </Typography>
          </Stack>
        ))}
      </Box>
    </>
  )
}

export default Updates
