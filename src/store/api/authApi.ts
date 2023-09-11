import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
    responseHandler: "text",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ loginId, password }) => ({
        url: "/admin/login",
        method: "POST",
        body: { loginId, password },
      }),
      transformResponse: (response: string, meta) => {
        const accessToken = meta?.response?.headers.get("Authorization");
        const refreshToken = meta?.response?.headers.get("Refresh-Token");
        return {
          message: response,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
