import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import { GetJJHModel, SearchModel, UpdateJJHModel } from "../../types/JJHTypes";

export const JJHApi = createApi({
  reducerPath: "JJHApi",
  tagTypes: ["JJHList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJJHList: builder.query<GetJJHModel, any>({
      query: () => `/jjh`,
      providesTags: ["JJHList"],
    }),
    getSearch: builder.query<SearchModel, string>({
      query: (search) => `/search/${search}`,
    }),
    updateJJHOrder: builder.mutation<void, UpdateJJHModel>({
      query: (JJHList) => {
        return {
          url: `/jjh`,
          method: "PATCH",
          body: JJHList,
        };
      },
      invalidatesTags: ["JJHList"],
    }),
    updateJJH: builder.mutation<void, void>({
      query: (JJHList) => {
        return {
          url: `/jjh/update`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useGetJJHListQuery,
  useGetSearchQuery,
  useLazyGetJJHListQuery,
  useUpdateJJHOrderMutation,
  useUpdateJJHMutation,
} = JJHApi;
