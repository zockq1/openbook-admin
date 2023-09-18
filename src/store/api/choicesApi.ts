import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import {
  AddChoiceModel,
  ChoiceListModel,
  GetChoiceModel,
  UpdateChoiceModel,
} from "../../types/choiceType";

export const choicesApi = createApi({
  reducerPath: "choicesApi",
  tagTypes: ["ChoiceList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getChoices: builder.query<
      { choiceList: ChoiceListModel[] },
      GetChoiceModel
    >({
      query: ({ roundNumber, questionNumber }) =>
        `/admin/rounds/${roundNumber}/questions/${questionNumber}/choices/`,
      providesTags: ["ChoiceList"],
    }),
    addChoices: builder.mutation<void, AddChoiceModel>({
      query: ({ choice, roundNumber, questionNumber }) => {
        return {
          url: `/admin/rounds/${roundNumber}/questions/${questionNumber}/choices/`,
          method: "POST",
          body: choice,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    updateChoice: builder.mutation<void, UpdateChoiceModel>({
      query: ({ choice, choiceId }) => {
        return {
          url: `/admin/choices/${choiceId}`,
          method: "PATCH",
          body: choice,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    deleteChoice: builder.mutation<void, number>({
      query: (choiceId) => {
        return {
          url: `/admin/choices/${choiceId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
  }),
});

export const {
  useGetChoicesQuery,
  useLazyGetChoicesQuery,
  useAddChoicesMutation,
  useUpdateChoiceMutation,
  useDeleteChoiceMutation,
} = choicesApi;
