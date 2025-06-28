// redux/slices/apiSlice.js
import { axiosBaseQuery } from '@/redux/utils/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/',
  }),
  endpoints: () => ({}),
});
