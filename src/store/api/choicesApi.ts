import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import {
  AddChoiceCommentModel,
  AddChoiceModel,
  DeleteChoiceCommentModel,
  GetChoiceModel,
  UpdateChoiceModel,
} from "../../types/choiceType";
import { GetQuestionModel } from "../../types/questionTypes";

export const choicesApi = createApi({
  reducerPath: "choicesApi",
  tagTypes: ["ChoiceList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getChoiceList: builder.query<GetChoiceModel[], GetQuestionModel>({
      query: ({ roundNumber, questionNumber }) =>
        `/admin/rounds/${roundNumber}/questions/${questionNumber}/choices/`,
      providesTags: ["ChoiceList"],
    }),
    addChoice: builder.mutation<void, AddChoiceModel>({
      query: ({ choice, roundNumber, questionNumber }) => {
        return {
          url: `/admin/rounds/${roundNumber}/questions/${questionNumber}/choice-info/`,
          method: "POST",
          body: choice,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    updateChoice: builder.mutation<void, UpdateChoiceModel>({
      query: ({ choice, choiceId }) => {
        return {
          url: `/admin/choices/${choiceId}/choice-info`,
          method: "PATCH",
          body: choice,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    addChoiceComment: builder.mutation<void, AddChoiceCommentModel>({
      query: ({ choiceId, comment }) => {
        return {
          url: `/admin/choices/${choiceId}/choice-comment`,
          method: "POST",
          body: comment,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    deleteChoiceComment: builder.mutation<void, DeleteChoiceCommentModel>({
      query: ({ choiceId, comment }) => {
        return {
          url: `/admin/choices/${choiceId}/choice-comment`,
          method: "DELETE",
          body: comment,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
  }),
});

export const {
  useGetChoiceListQuery,
  useAddChoiceCommentMutation,
  useAddChoiceMutation,
  useUpdateChoiceMutation,
  useDeleteChoiceCommentMutation,
} = choicesApi;
