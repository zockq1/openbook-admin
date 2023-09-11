import { createApi } from "@reduxjs/toolkit/query/react";
import { CategoryModel } from "../../types/categoryType";
import baseQueryWithReauth from "./baseApi";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["CategoryList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCategoryList: builder.query<CategoryModel[], void>({
      query: () => `/admin/categories`,
      providesTags: ["CategoryList"],
    }),
    addCategory: builder.mutation({
      query: (categoryName: string) => {
        return {
          url: `/admin/categories`,
          method: "POST",
          body: {
            name: categoryName,
          },
        };
      },
      invalidatesTags: ["CategoryList"],
    }),
    updateCategory: builder.mutation({
      query: ({ beforeCategoryName, afterCategoryName }) => {
        return {
          url: `/admin/categories/${beforeCategoryName}`,
          method: "PATCH",
          body: {
            name: afterCategoryName,
          },
        };
      },
      invalidatesTags: ["CategoryList"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryName: string) => {
        return {
          url: `/admin/categories/${categoryName}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["CategoryList"],
    }),
  }),
});

export const {
  useGetCategoryListQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
