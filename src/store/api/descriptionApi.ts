import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import { GetQuestionModel } from "../../types/questionTypes";
import {
  AddDescriptionModel,
  DeleteDescriptionModel,
  GetDescriptionModel,
  UpdateDescriptionModel,
} from "../../types/descriptionType";

export const descriptionApi = createApi({
  reducerPath: "descriptionApi",
  tagTypes: ["Description"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDescription: builder.query<GetDescriptionModel, GetQuestionModel>({
      query: ({ questionNumber, roundNumber }) =>
        `/rounds/${roundNumber}/questions/${questionNumber}/descriptions/`,
      providesTags: ["Description"],
    }),
    updateDescription: builder.mutation<void, UpdateDescriptionModel>({
      query: ({ descriptionId, description }) => {
        return {
          url: `/descriptions/${descriptionId}/`,
          method: "PATCH",
          body: { description },
        };
      },
      invalidatesTags: ["Description"],
    }),
    addDescriptionComment: builder.mutation<void, AddDescriptionModel>({
      query: ({ descriptionId, comment }) => {
        return {
          url: `/descriptions/${descriptionId}/`,
          method: "POST",
          body: comment,
        };
      },
      invalidatesTags: ["Description"],
    }),
    deleteDescriptionComment: builder.mutation<void, DeleteDescriptionModel>({
      query: ({ descriptionId, comment }) => {
        return {
          url: `/descriptions/${descriptionId}/`,
          method: "DELETE",
          body: comment,
        };
      },
      invalidatesTags: ["Description"],
    }),
  }),
});

export const {
  useGetDescriptionQuery,
  useLazyGetDescriptionQuery,
  useAddDescriptionCommentMutation,
  useUpdateDescriptionMutation,
  useDeleteDescriptionCommentMutation,
} = descriptionApi;
