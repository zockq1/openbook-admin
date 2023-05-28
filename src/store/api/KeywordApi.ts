import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddKeywordModel, KeywordModel } from "../../types/keywordType";

export const keywordApi = createApi({
  reducerPath: "keywordApi",
  tagTypes: ["KeywordList"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getKeywordList: builder.query<KeywordModel[], void>({
      query: (topicTitle) => `/admin/topics/${topicTitle}/keywords/`,
      providesTags: ["KeywordList"],
    }),
    addKeyword: builder.mutation({
      query: (addKeywordModel: AddKeywordModel) => {
        return {
          url: `/admin/keywords`,
          method: "POST",
          body: {
            name: addKeywordModel,
          },
        };
      },
      invalidatesTags: ["KeywordList"],
    }),
    deleteKeyword: builder.mutation({
      query: (keywordId: number) => {
        return {
          url: `/admin/keywords/${keywordId}`,
          method: "DELETE",
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
