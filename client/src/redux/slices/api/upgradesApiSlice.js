// frontend/api/itemsApiSlice.js
import { apiSlice } from './apiSlice';
import qs from 'qs';

export const upgradesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItemsByPart: builder.query({
      query: ({ partIdnt, filters = {}, limit = 10, offset = 0 }) => {
        const query = {
          ...filters,
          limit,
          offset,
        };

        const queryString = qs.stringify(query, {
          arrayFormat: 'repeat', // c_4=68993&c_4=68996
          encode: false,
        });

        return {
          url: `items/${partIdnt}?${queryString}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 600, // кэш на 10 минут
    }),
  }),
});

export const { useGetItemsByPartQuery } = upgradesApiSlice;
