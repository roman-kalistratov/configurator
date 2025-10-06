import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
  name: 'view',
  initialState: {
    listView: true, // true = list, false = grid
  },
  reducers: {
    setView: (state, action) => {
      state.listView = action.payload;
    },
    toggleView: (state) => {
      state.listView = !state.listView;
    },
  },
});

export const { setView, toggleView } = viewSlice.actions;
export default viewSlice.reducer;
