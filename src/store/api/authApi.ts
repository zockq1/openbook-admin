import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ id, password }) => ({
        url: "/admin/login",
        method: "POST",
        body: { id, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
