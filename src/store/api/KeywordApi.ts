import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddKeywordModel } from "../../types/keywordType";

export const keywordApi = createApi({
  reducerPath: "keywordApi",
  tagTypes: ["KeywordList"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getKeywordList: builder.query<string[], string>({
      query: (topicTitle) => `/topics/${topicTitle}/keywords`,
      providesTags: ["KeywordList"],
    }),
    addKeyword: builder.mutation({
      query: (addKeywordModel: AddKeywordModel) => {
        return {
          url: `/admin/topics/${addKeywordModel.topicTitle}/keywords`,
          method: "POST",
          body: {
            name: addKeywordModel.keyword,
          },
        };
      },
      invalidatesTags: ["KeywordList"],
    }),
    deleteKeyword: builder.mutation({
      query: (addKeywordModel: AddKeywordModel) => {
        return {
          url: `/admin/topics/${addKeywordModel.topicTitle}/keywords`,
          method: "DELETE",
          body: {
            name: addKeywordModel.keyword,
          },
        };
      },
      invalidatesTags: ["KeywordList"],
    }),
  }),
});

export const {
  useGetKeywordListQuery,
  useAddKeywordMutation,
  useDeleteKeywordMutation,
} = keywordApi;
