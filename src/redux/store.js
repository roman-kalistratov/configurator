import { configureStore } from "@reduxjs/toolkit";
import filtersStateSlice from "./slices/filtersStateSlice";
import modalStateSlice from "./slices/modalStateSlice";
import loadingSlice from "./slices/loadingStateSlice";

const store = configureStore({
  reducer: {
    filters: filtersStateSlice,
    modal: modalStateSlice,
    loading: loadingSlice,
  },
});

export default store;
