import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import { GetJJHModel, UpdateJJHModel } from "../../types/JJHTypes";

export const JJHApi = createApi({
  reducerPath: "JJHApi",
  tagTypes: ["JJHList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJJHList: builder.query<GetJJHModel, any>({
      query: () => `/jjh`,
      providesTags: ["JJHList"],
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
  }),
});

export const {
  useGetJJHListQuery,
  useLazyGetJJHListQuery,
  useUpdateJJHOrderMutation,
} = JJHApi;
