import { createSlice } from '@reduxjs/toolkit';

export const partSlice = createSlice({
  name: 'part',
  initialState: {
    selectedPart: {}, // например: { idnt: 'c_4', title: 'CPU' }
  },
  reducers: {
    setSelectedPart: (state, action) => {
      state.selectedPart = action.payload;
    },
    clearSelectedPart: (state) => {
      state.selectedPart = {};
    },
    updateSelectedPartTitle: (state, action) => {
      if (state.selectedPart) {
        state.selectedPart.title = action.payload;
      }
    },
  },
});

// Экспортируем actions и reducer
export const { setSelectedPart, clearSelectedPart, updateSelectedPartTitle } =
  partSlice.actions;

export default partSlice.reducer;
