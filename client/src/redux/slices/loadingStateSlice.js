import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  global: false,
  parts: false,
  part: false,
  items: false,
  item: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action) {
      const { type, value } = action.payload;
      if (state[type] === value) return;
      state[type] = value;
    },
    resetLoading(state) {
      Object.keys(state).forEach((key) => {
        state[key] = false;
      });
    },
  },
});

export const { setLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
