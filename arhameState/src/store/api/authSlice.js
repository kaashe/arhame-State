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
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `user/update/${id}`,
        method: "POST",
        body: user,
      }),
    }),
    deleteteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete/${id}`,
        method: "DELETE",
      }),
    }),
    signOutUser: builder.query({
      query: (id) => ({
        url: "user/sign-out",
        method: "GET",
      }),
    }),
    google: builder.mutation({
      query: (user) => ({
        url: "auth/google",
        method: "POST",
        body: user,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useUpdateUserMutation,
  useDeleteteUserMutation,
  useSignOutUserQuery,
  useGoogleMutation,
} = userApi;
