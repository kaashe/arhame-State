// store/api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api", // Unique key for the API reducer
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: () => ({}),
});

export default baseApi;
