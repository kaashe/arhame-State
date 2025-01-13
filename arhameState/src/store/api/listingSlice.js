import { baseApi } from "./baseApi";

export const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createListing: builder.mutation({
      query: (body) => ({
        url: "listing/create",
        method: "POST",
        body: body,
      }),
    }),
    deleteListing: builder.mutation({
      query: (id) => ({
        url: `listing/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const { useCreateListingMutation, useDeleteListingMutation } =
  listingApi;
