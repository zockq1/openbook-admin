import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ loginId, password }) => ({
        url: "/admin/login",
        method: "POST",
        body: { loginId, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
