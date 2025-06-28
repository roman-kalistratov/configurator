// redux/slices/partsApiSlice.js
import { apiSlice } from './apiSlice';

export const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParts: builder.query({
      query: () => ({
        url: 'parts',
        method: 'GET',
      }),
      // Настройки RTK Query:
      keepUnusedDataFor: 60, // кешировать 60 секунд после последнего подписчика
      refetchOnMountOrArgChange: false, // не перезапрашивать, если уже есть данные в кеше
      // pollingInterval: 0,          // по умолчанию polling выключен, можно явно указать
    }),
  }),
});

export const { useGetPartsQuery } = partsApiSlice;
