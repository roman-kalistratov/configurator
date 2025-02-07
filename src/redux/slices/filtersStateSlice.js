import { createSlice } from "@reduxjs/toolkit"
import data from "../../upgrades.json"

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    part: null, // данные из ключевой колонки, которые относятся к idnt
    selectedFilters: [], // массив выбранных фильтров
    filters: {}, // данные при выборе part, по которой фильтруются товары
    partItems: {}, // все доступные товары
    compat: {}, // зависимости
  },
  reducers: {
    setPart: (state, action) => {
      state.part = action.payload
      const { filters, partItems, compat } = getDataByPart(action.payload)
      state.filters = filters
      state.partItems = partItems
      state.compat = compat
    },
    setFilter: (state, action) => {
      const filter = action.payload // Объект фильтра с полями name, tag, cl
      const filterTag = filter.tag // Извлекаем только tag

      if (state.selectedFilters.includes(filterTag)) {
        // Убираем фильтр, если он уже выбран
        state.selectedFilters = state.selectedFilters.filter(
          (f) => f !== filterTag
        )
      } else {
        // Добавляем новый фильтр
        state.selectedFilters.push(filterTag)
      }
    },
  },
})

// Функция для получения тегов и товаров по части
const getDataByPart = (idnt) => {
  if (idnt === null || idnt === undefined) {
    console.warn("IDNT is null or undefined")
    return { filters: {}, partItems: {} }
  }

  if (!data.upgrade[idnt]) {
    console.error(`No data found for idnt: ${idnt}`)
    return { filters: {}, partItems: {} }
  }

  const upgradeData = data.upgrade[idnt]

  const filters = upgradeData.filter
    ? Object.entries(upgradeData.filter).reduce(
        (acc, [categoryKey, categoryValue]) => {
          acc[categoryKey] = {
            title: categoryValue.title || "",
            filters: Object.values(categoryValue).filter((tag) => tag.name),
          }
          return acc
        },
        {}
      )
    : {}

  const partItems = upgradeData.items || {}
  const compat = upgradeData.compat || {}

  return { filters, partItems, compat }
}

export const { setPart, setFilter } = filtersSlice.actions

export default filtersSlice.reducer
