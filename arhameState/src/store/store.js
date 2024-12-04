// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { userApi } from "./api/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Add RTK Query reducer
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // Add RTK Query middleware
});

export default store;
