// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { userApi } from "./api/authSlice";
import userSlice from "./user/userSlice";
userSlice;
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Add RTK Query reducer
    [userApi.reducerPath]: userApi.reducer,
    userReducer: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // Add RTK Query middleware
});

export default store;
