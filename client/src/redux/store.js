import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/api/apiSlice';
import filtersStateSlice from './slices/filtersStateSlice';
import upgradesStateSlice from './slices/upgradesStateSlice';
import modalStateSlice from './slices/modalStateSlice';
import partSlice from './slices/partSlice';
import loadingSlice from './slices/loadingStateSlice';

const store = configureStore({
  reducer: {
    filters: filtersStateSlice,
    upgrades: upgradesStateSlice,
    modal: modalStateSlice,

    part: partSlice,
    loading: loadingSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
