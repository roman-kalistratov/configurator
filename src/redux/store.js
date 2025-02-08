import { configureStore } from "@reduxjs/toolkit"
import filtersStateSlice from "./slices/filtersStateSlice"
import modalStateSlice from "./slices/modalStateSlice"

const store = configureStore({
  reducer: {
    filters: filtersStateSlice,
    modal: modalStateSlice,
  },
})

export default store
