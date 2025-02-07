import { createSlice } from "@reduxjs/toolkit"
import data from "../../upgrades.json"

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    part: null, // данные из ключевой колонки, которые относятся к idnt
    filters: {}, // данные при выборе part, по которой фильтруются товары
  },
  reducers: {
    setPart: (state, action) => {
      state.part = action.payload
      state.filters = getTagsByPart(action.payload) // обновляем теги при изменении part
    },
  },
})

// Функция для получения тегов по части
const getTagsByPart = (idnt) => {
  if (idnt === null || idnt === undefined) {
    console.warn("IDNT is null or undefined")
    return {} // Возвращаем пустой объект, если idnt не определен
  }

  if (!data.upgrade[idnt]) {
    console.error(`No data found for idnt: ${idnt}`)
    return {}
  }

  if (!data.upgrade[idnt].filter) {
    console.warn(`No filters available for idnt: ${idnt}`)
    return {}
  }

  return Object.entries(data.upgrade[idnt].filter).reduce(
    (acc, [categoryKey, categoryValue]) => {
      acc[categoryKey] = {
        title: categoryValue.title || "",
        tags: Object.values(categoryValue).filter((tag) => tag.name),
      }
      return acc
    },
    {}
  )
}

export const { setPart, setFilter } = filtersSlice.actions

export default filtersSlice.reducer
