import { createSlice } from '@reduxjs/toolkit';

export const upgradesSlice = createSlice({
  name: 'upgrades',
  initialState: {
    selectedUpgrades: {},
  },
  reducers: {
    setUpgrade: (state, action) => {
      const { partIdnt, upgrade } = action.payload;
      state.selectedUpgrades[partIdnt] = upgrade;
    },
    clearUpgrade: (state, action) => {
      const { partIdnt } = action.payload;
      delete state.selectedUpgrades[partIdnt];
    },

    clearAllUpgrades: (state) => {
      state.selectedUpgrades = {};
    },
  },
});

export const { setUpgrade, clearUpgrade, clearAllUpgrades } =
  upgradesSlice.actions;
export default upgradesSlice.reducer;
