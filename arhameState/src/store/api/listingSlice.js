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
  }),
});
export const { useCreateListingMutation } = listingApi;
