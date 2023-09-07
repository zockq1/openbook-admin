import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddQuestionModel,
  DeleteQuestionModel,
  GetQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from "../../types/questionTypes";

export const questionApi = createApi({
  reducerPath: "questionApi",
  tagTypes: ["QuestionList", "QuestionInfo"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
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
  useGetRoundQuestionListQuery,
  useUpdateQuestionMutation,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
