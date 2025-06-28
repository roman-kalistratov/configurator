import { apiSlice } from './apiSlice';

export const filtersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFiltersByPart: builder.query({
      query: (partIdnt) => ({
        url: `filters/${partIdnt}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetFiltersByPartQuery } = filtersApiSlice;
