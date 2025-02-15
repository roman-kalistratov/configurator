import { createSlice } from "@reduxjs/toolkit"
import data from "../../upgrades.json"

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    part: {}, // данные из ключевой колонки, которые относятся к idnt
    selectedFilters: [], // массив выбранных фильтров
    filters: {}, // данные при выборе part, по которой фильтруются товары
    partItems: {}, // все доступные товары
    compat: {}, // зависимости
    selectedUpgrades: [], // массив выбранных частей
  },
  reducers: {
    setPart: (state, action) => {
      state.part = action.payload
      const { filters, partItems, compat } = getDataByPart(action.payload.idnt)
      state.filters = filters
      state.partItems = partItems
      state.compat = compat
    },
    setFilter: (state, action) => {
      const filter = action.payload // Объект фильтра с полями name, tag, cl

      if (!state.part.idnt) {
        console.warn("No selected part to associate with the filter.")
        return
      }

      const filterWithPart = { ...filter, partIdnt: state.part.idnt } // Добавляем связь с part

      const existingFilterIndex = state.selectedFilters.findIndex(
        (f) => f.tag === filter.tag && f.partIdnt === state.part.idnt // Проверяем tag и принадлежность part
      )

      if (existingFilterIndex !== -1) {
        // Если уже есть фильтр с таким tag для текущей part, удаляем его
        state.selectedFilters.splice(existingFilterIndex, 1)
      } else {
        // Добавляем новый фильтр с привязкой к part
        state.selectedFilters.push(filterWithPart)
      }
    },
    removeFilter: (state, action) => {
      const tag = action.payload

      state.selectedFilters = state.selectedFilters.filter(
        (filter) => !(filter.tag === tag)
      )
    },
    setUpgrade: (state, action) => {
      const upgrade = action.payload

      // Добавляем partIdnt из выбранной части
      const upgradeWithPartIdnt = { ...upgrade, partIdnt: state.part.idnt }

      // Удаляем все предыдущие апгрейды с таким же partIdnt
      state.selectedUpgrades = state.selectedUpgrades.filter(
        (item) => item.partIdnt !== state.part.idnt
      )

      // Добавляем новый upgrade
      state.selectedUpgrades.push(upgradeWithPartIdnt)
    },
    removeUpgrade: (state, action) => {
      const partIdnt = action.payload // Получаем partIdnt из payload

      // Удаляем апгрейд с указанным partIdnt
      state.selectedUpgrades = state.selectedUpgrades.filter(
        (upgrade) => upgrade.partIdnt !== partIdnt
      )
    },
    resetUpgrades: (state) => {
      // Очищаем все данные из selectedUpgrades
      state.selectedUpgrades = []
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

export const {
  setPart,
  setFilter,
  removeFilter,
  setUpgrade,
  removeUpgrade,
  resetUpgrades,
} = filtersSlice.actions

export default filtersSlice.reducer
