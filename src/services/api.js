import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const displayApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
  reducerPath: 'displayApi',
  keepUnusedDataFor: 600, // TODO possibly make this much longer
  endpoints: (builder) => ({
    fetchHomeData: builder.query({
      query: () => '/category?published=true',
    }),
    fetchCategoryData: builder.query({
      query: ({ key, sub = null }) => {
        let uri = `/category/${key}`;
        if (sub) uri += `/subCategory/${sub}`;
        return uri;
      },
    }),
    fetchItemData: builder.query({
      query: ({ key, item, sub = null }) => {
        let uri = `/category/${key}`;
        if (sub) uri += `/subCategory/${sub}`;
        uri += `/item/${item}`;
        return uri;
      },
    }),
  }),
});

export const {
  useFetchHomeDataQuery,
  useFetchCategoryDataQuery,
  useFetchItemDataQuery,
  usePrefetch,
} = displayApi;
