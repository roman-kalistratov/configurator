import { useEffect, useRef, useState } from "react"
import { Box, Chip, Paper, Stack } from "@mui/material"
import { useTheme } from "@emotion/react"
import ViewListIcon from "@mui/icons-material/ViewList"
import GridViewIcon from "@mui/icons-material/GridView"
import { useSelector } from "react-redux"

const Updates = () => {
  const theme = useTheme()
  const [selectedFilters, setSelectedFilters] = useState({}) // Храним выбранные фильтры для каждой группы
  const tagsByPart = useSelector((state) => state.filters.filters)

  // Состояние для представлений каждой группы тегов
  const [views, setViews] = useState({})

  useEffect(() => {
    if (tagsByPart) {
      console.log(tagsByPart)
      // Инициализируем состояние представления и выбранные фильтры для каждой группы тегов
      const initialViews = Object.keys(tagsByPart).reduce((acc, key) => {
        acc[key] = "list" // Устанавливаем начальное представление для каждой группы
        return acc
      }, {})
      setViews(initialViews)
      setSelectedFilters({}) // Сбрасываем выбранные фильтры
    }
  }, [tagsByPart])

  const handleMouseDown = (e, containerRef) => {
    containerRef.current.isDragging = true
    containerRef.current.startX = e.pageX - containerRef.current.offsetLeft
    containerRef.current.scrollLeft = containerRef.current.scrollLeft
    e.preventDefault()
  }

  const handleMouseMove = (e, containerRef) => {
    if (!containerRef.current.isDragging) return
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = x - containerRef.current.startX
    containerRef.current.scrollLeft -= walk
  }

  const handleMouseUp = (containerRef) => {
    containerRef.current.isDragging = false
  }

  const handleMouseLeave = (containerRef) => {
    containerRef.current.isDragging = false
  }

  const selectTag = (tag, key) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [key]: tag, // Обновляем выбранный фильтр для конкретной группы
    }))
  }

  // Функция для изменения представления для конкретной группы
  const toggleView = (key, newView) => {
    setViews((prevViews) => ({
      ...prevViews,
      [key]: newView,
    }))
  }

  return (
    <Paper elevation={1}>
      {Object.entries(tagsByPart).length === 0 ? (
        <Chip
          label="No tags available."
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
      ) : (
        Object.entries(tagsByPart).map(([key, { title, tags }]) => {
          const containerRef = useRef({
            isDragging: false,
            startX: 0,
            scrollLeft: 0,
          })

          return (
            <Stack key={key} direction="row" alignItems="center">
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
                ref={containerRef}
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "100%",
                  position: "relative",
                  borderRight: `1px solid ${theme.palette.secondary.dark}`,
                  borderLeft: `1px solid ${theme.palette.secondary.dark}`,
                }}
                onMouseDown={(e) => handleMouseDown(e, containerRef)}
                onMouseUp={() => handleMouseUp(containerRef)}
                onMouseLeave={() => handleMouseLeave(containerRef)}
                onMouseMove={(e) => handleMouseMove(e, containerRef)}
              >
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.name}
                    sx={{
                      height: "auto",
                      p: 1.4,
                      borderRadius: 0,
                      cursor: "pointer",
                      fontSize: "16px",
                      background: "none",
                      transition: "background-color 0.1s ease",
                      borderBottom: `1px solid ${
                        tag === selectedFilters[key]
                          ? theme.palette.primary.light
                          : "inherit"
                      }`,
                      "&:hover": {
                        color: "primary.light",
                      },
                    }}
                    onClick={() => selectTag(tag, key)}
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
                    color: `${
                      views[key] === "list" ? "primary.light" : "secondary.main"
                    }`,
                  }}
                  onClick={() => toggleView(key, "list")}
                />
                <GridViewIcon
                  sx={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: `${
                      views[key] === "grid" ? "primary.light" : "secondary.main"
                    }`,
                  }}
                  onClick={() => toggleView(key, "grid")}
                />
              </Stack>
            </Stack>
          )
        })
      )}
    </Paper>
  )
}

export default Updates
