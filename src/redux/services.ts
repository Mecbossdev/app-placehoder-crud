import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Posts } from './type'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPostByName: builder.query<Posts[], void>({
      query: () => '/posts',
      providesTags: ['posts'],
      transformResponse: (response: Posts[]) => {
        return response.reverse()
      },
    }),
    addUser: builder.mutation<Posts, Posts>({
      query: (user) => ({
        url: '/posts',
        body: user,
        method: 'POST',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
})

export const { useGetPostByNameQuery } = postApi
