import { createSlice } from '@reduxjs/toolkit';

const MAX_ITEMS = 4;

const initialState = {
  list: [],
  openPartIdnt: null, // здесь будем хранить, какой compareDrawer открыт
  error: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    openCompareDrawer: (state, action) => {
      state.openPartIdnt = action.payload; // payload = partIdnt
    },
    closeCompareDrawer: (state) => {
      state.openPartIdnt = null;
    },
    addItemToCompare: (state, action) => {
      const { partIdnt, item } = action.payload;
      const entry = state.list.find((e) => e.partIdnt === partIdnt);

      if (!entry) {
        state.list.push({ partIdnt, items: [item] });
        state.error = null;
      } else if (entry.items.includes(item)) {
        state.error = `Item ${item} уже добавлен`;
      } else if (entry.items.length >= MAX_ITEMS) {
        state.error = `У partIdnt ${partIdnt} нельзя больше ${MAX_ITEMS} items`;
      } else {
        entry.items.push(item);
        state.error = null;
      }
    },
    removeItemFromCompare: (state, action) => {
      const { partIdnt, item } = action.payload;
      const entry = state.list.find((e) => e.partIdnt === partIdnt);

      if (entry) {
        entry.items = entry.items.filter((i) => i !== item);
        if (entry.items.length === 0) {
          state.list = state.list.filter((e) => e.partIdnt !== partIdnt);
        }
        state.error = null;
      }
    },
    clearCompare: (state) => {
      state.list = [];
      state.error = null;
    },
  },
});

export const {
  openCompareDrawer,
  closeCompareDrawer,
  addItemToCompare,
  removeItemFromCompare,
  clearCompare,
} = compareSlice.actions;

export default compareSlice.reducer;
