import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SentenceModel, addSentenceModel } from "../../types/sentenceType";

export const sentenceApi = createApi({
  reducerPath: "sentenceApi",
  tagTypes: ["SentenceList"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getSentences: builder.query<SentenceModel[], string>({
      query: (topicTitle) => `/topics/${topicTitle}/sentences/`,
      providesTags: ["SentenceList"],
    }),
    addSentence: builder.mutation({
      query: (sentence: addSentenceModel) => {
        return {
          url: `/admin/sentences/`,
          method: "POST",
          body: sentence,
        };
      },
      invalidatesTags: ["SentenceList"],
    }),
    updateSentence: builder.mutation({
      query: (sentence: SentenceModel) => {
        return {
          url: `/admin/sentences/${sentence.id}`,
          method: "PATCH",
          body: { name: sentence.name },
        };
      },
      invalidatesTags: ["SentenceList"],
    }),
    deleteSentence: builder.mutation({
      query: (id: number) => {
        return {
          url: `/admin/sentences/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["SentenceList"],
    }),
  }),
});

export const {
  useGetSentencesQuery,
  useAddSentenceMutation,
  useUpdateSentenceMutation,
  useDeleteSentenceMutation,
} = sentenceApi;
