import { createApi } from "@reduxjs/toolkit/query/react";
import { EraModel } from "../../types/eraType";
import baseQueryWithReauth from "./baseApi";

export const eraApi = createApi({
  reducerPath: "eraApi",
  tagTypes: ["EraList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getEraList: builder.query<EraModel[], void>({
      query: () => `/admin/eras`,
      providesTags: ["EraList"],
    }),
    addEra: builder.mutation({
      query: (eraName: string) => {
        return {
          url: `/admin/eras`,
          method: "POST",
          body: {
            name: eraName,
          },
        };
      },
      invalidatesTags: ["EraList"],
    }),
    updateEra: builder.mutation({
      query: ({ beforeEraName, afterEraName }) => {
        return {
          url: `/admin/eras/${beforeEraName}`,
          method: "PATCH",
          body: {
            name: afterEraName,
          },
        };
      },
      invalidatesTags: ["EraList"],
    }),
    deleteEra: builder.mutation({
      query: (eraName: string) => {
        return {
          url: `/admin/eras/${eraName}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["EraList"],
    }),
  }),
});

export const {
  useGetEraListQuery,
  useAddEraMutation,
  useDeleteEraMutation,
  useUpdateEraMutation,
} = eraApi;
