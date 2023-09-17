import { createApi } from "@reduxjs/toolkit/query/react";
import { AddKeywordModel, KeywordModel } from "../../types/keywordType";
import baseQueryWithReauth from "./baseApi";

export const keywordApi = createApi({
  reducerPath: "keywordApi",
  tagTypes: ["KeywordList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getKeywordList: builder.query<KeywordModel[], string>({
      query: (topicTitle) => `/topics/${topicTitle}/keywords`,
      providesTags: ["KeywordList"],
    }),
    addKeyword: builder.mutation({
      query: (addKeywordModel: AddKeywordModel) => {
        return {
          url: `/admin/keywords`,
          method: "POST",
          body: addKeywordModel,
        };
      },
      invalidatesTags: ["KeywordList"],
    }),
    updateKeyword: builder.mutation({
      query: (updateKeywordModel: KeywordModel) => {
        return {
          url: `/admin/keywords/${updateKeywordModel.id}`,
          method: "PATCH",
          body: {
            name: updateKeywordModel.name,
            comment: updateKeywordModel.comment,
            file: updateKeywordModel.file,
          },
        };
      },
      invalidatesTags: ["KeywordList"],
    }),
    deleteKeyword: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/keywords/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["KeywordList"],
    }),
  }),
});

export const {
  useGetKeywordListQuery,
  useLazyGetKeywordListQuery,
  useAddKeywordMutation,
  useDeleteKeywordMutation,
  useUpdateKeywordMutation,
} = keywordApi;
