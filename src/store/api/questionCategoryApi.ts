import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import {
  AddQuestionCategoryModel,
  DeleteQuestionCategoryModel,
  GetQuestionCategoryModel,
  QuestionCategoryOrderModel,
  UpdateQuestionCategoryModel,
} from "../../types/questionCategory";

export const questionCategoryApi = createApi({
  reducerPath: "questionCategoryApi",
  tagTypes: ["QuestionCategoryList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getQuestionCategoryList: builder.query<GetQuestionCategoryModel, void>({
      query: () => `/admin/question-categories`,
      providesTags: ["QuestionCategoryList"],
    }),
    addQuestionCategory: builder.mutation<void, AddQuestionCategoryModel>({
      query: (questionCategory) => {
        return {
          url: `/admin/question-categories`,
          method: "POST",
          body: questionCategory,
        };
      },
      invalidatesTags: ["QuestionCategoryList"],
    }),
    updateQuestionCategory: builder.mutation<void, UpdateQuestionCategoryModel>(
      {
        query: (updatedQuestionCategory) => {
          return {
            url: `/admin/question-categories/${updatedQuestionCategory.id}`,
            method: "PATCH",
            body: updatedQuestionCategory.updatedQuestionCategory,
          };
        },
        invalidatesTags: ["QuestionCategoryList"],
      }
    ),
    updateQuestionCategoryOrder: builder.mutation<
      void,
      QuestionCategoryOrderModel[]
    >({
      query: (keywordList) => {
        return {
          url: `/admin/question-category-numbers`,
          method: "PATCH",
          body: keywordList,
        };
      },
      invalidatesTags: ["QuestionCategoryList"],
    }),
    deleteQuestionCategory: builder.mutation<void, DeleteQuestionCategoryModel>(
      {
        query: (deleteTimelineId) => {
          return {
            url: `/admin/question-categories/${deleteTimelineId.id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["QuestionCategoryList"],
      }
    ),
  }),
});

export const {
  useGetQuestionCategoryListQuery,
  useAddQuestionCategoryMutation,
  useDeleteQuestionCategoryMutation,
  useUpdateQuestionCategoryMutation,
  useUpdateQuestionCategoryOrderMutation,
} = questionCategoryApi;
