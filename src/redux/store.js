import { configureStore } from "@reduxjs/toolkit"
import filtersStateSlice from "./slices/filtersStateSlice"

const store = configureStore({
  reducer: {
    filters: filtersStateSlice,
  },
})

export default store
