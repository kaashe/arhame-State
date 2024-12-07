// store/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { userApi } from "./api/authSlice";
import userSlice from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
userSlice;

const rootReducer = combineReducers({ userReducer: userSlice });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Add RTK Query reducer
    [userApi.reducerPath]: userApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware), // Add RTK Query middleware
});

export default store;
export const persistor = persistStore(store);
