import { apiSlice } from './apiSlice';

export const compatibilityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkCompatibility: builder.mutation({
      query: (buildData) => ({
        url: 'compatibility/check',
        method: 'POST',
        data: buildData,
      }),
    }),
  }),
});

export const { useCheckCompatibilityMutation } = compatibilityApiSlice;
