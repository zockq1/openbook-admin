import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChapterListModel } from "../../types/chapterTypes";
import { TopicListModel } from "../../types/topicTypes";
import apiUrl from "./config";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
  }),
  tagTypes: ["ChapterList"],
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterListModel, void>({
      query: () => "/admin/chapters",
      providesTags: ["ChapterList"],
    }),
    getChapterTopicList: builder.query<TopicListModel, number | null>({
      query: (chapter) => `/chapters/${chapter}/topics`,
    }),
    addChapter: builder.mutation({
      query: ({ number, title }) => {
        return {
          url: `/admin/chapters`,
          method: "POST",
          body: { number, title },
        };
      },
      invalidatesTags: ["ChapterList"],
    }),
    updateChapter: builder.mutation({
      query: ({ number, title }) => {
        return {
          url: `/admin/chapters/${number}`,
          method: "PATCH",
          body: { number, title },
        };
      },
      invalidatesTags: ["ChapterList"],
    }),
    deleteChapter: builder.mutation({
      query: ({ number }) => {
        return {
          url: `/admin/chapters/${number}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ChapterList"],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetChapterTopicListQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApi;
