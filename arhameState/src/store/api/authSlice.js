// store/api/userApi.js
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "auth/",
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: "auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (user) => ({
        url: "auth/signin",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
