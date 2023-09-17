import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddQuestionModel,
  DeleteQuestionModel,
  GetQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from "../../types/questionTypes";
import baseQueryWithReauth from "./baseApi";

export const questionApi = createApi({
  reducerPath: "questionApi",
  tagTypes: ["QuestionList", "QuestionInfo"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getQuestion: builder.query<QuestionModel, GetQuestionModel>({
      query: ({ roundNumber, questionNumber }) =>
        `/rounds/${roundNumber}/questions/${questionNumber}`,
      providesTags: ["QuestionInfo"],
    }),
    getRoundQuestionList: builder.query<number[], number>({
      query: (roundNumber) => `/rounds/${roundNumber}/questions`,
      providesTags: ["QuestionList"],
    }),
    addQuestion: builder.mutation<any, AddQuestionModel>({
      query: ({ question, roundNumber }) => {
        return {
          url: `/admin/rounds/${roundNumber}/questions`,
          method: "POST",
          body: question,
        };
      },
      invalidatesTags: ["QuestionList"],
    }),
    updateQuestion: builder.mutation<any, UpdateQuestionModel>({
      query: ({
        updatedQuestion,
        currentQuestionNumber,
        roundNumber,
      }: UpdateQuestionModel) => {
        return {
          url: `/admin/rounds/${roundNumber}/questions/${currentQuestionNumber}`,
          method: "PATCH",
          body: updatedQuestion,
        };
      },
      invalidatesTags: ["QuestionList", "QuestionInfo"],
    }),
    deleteQuestion: builder.mutation<any, DeleteQuestionModel>({
      query: ({ roundNumber, questionNumber }) => {
        return {
          url: `/admin/rounds/${roundNumber}/questions/${questionNumber}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["QuestionList", "QuestionInfo"],
    }),
  }),
});

export const {
  useGetQuestionQuery,
  useLazyGetQuestionQuery,
  useGetRoundQuestionListQuery,
  useLazyGetRoundQuestionListQuery,
  useUpdateQuestionMutation,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
