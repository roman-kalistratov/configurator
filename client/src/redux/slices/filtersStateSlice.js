import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedFiltersByPart: {},
  },
  reducers: {
    // Добавляет фильтр, если его ещё нет
    setFilter: (state, action) => {
      const { partIdnt, title, tag, key, tagName, partType } = action.payload;
      if (!state.selectedFiltersByPart[partIdnt]) {
        state.selectedFiltersByPart[partIdnt] = [];
      }

      const exists = state.selectedFiltersByPart[partIdnt].some(
        (f) => f.tag === tag,
      );
      if (!exists) {
        state.selectedFiltersByPart[partIdnt].push({
          title,
          tag,
          key,
          tagName,
          partType,
        });
      }
    },

    removeFilter: (state, action) => {
      const { partIdnt, tag } = action.payload;
      if (state.selectedFiltersByPart[partIdnt]) {
        state.selectedFiltersByPart[partIdnt] = state.selectedFiltersByPart[
          partIdnt
        ].filter((f) => f.tag !== tag);
      }
    },

    clearFilters: (state, action) => {
      const partIdnt = action.payload;
      const { [partIdnt]: _, ...rest } = state.selectedFiltersByPart;
      state.selectedFiltersByPart = rest;
    },

    clearAllFilters: (state) => {
      state.selectedFiltersByPart = {};
    },
  },
});

export const {
  setFilter,
  removeFilter,
  clearFilters,
  setMultipleFilters,
  clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
