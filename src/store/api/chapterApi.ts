import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
} from "../../types/chapterTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  tagTypes: ["ChapterList", "ChapterTitle", "ChapterInfo"],
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterModel[], void>({
      query: () => "/admin/chapters",
      providesTags: ["ChapterList"],
    }),
    getChapterTitle: builder.query<ChapterTitleModel, number>({
      query: (chapterNumber) =>
        `/admin/chapters/chapter-title?num=${chapterNumber}`,
      providesTags: ["ChapterTitle"],
    }),
    getChapterInfo: builder.query<ChapterInfoModel, number>({
      query: (chapterNumber) => `/admin/chapters/${chapterNumber}/info`,
      providesTags: ["ChapterInfo"],
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
    updateChapterInfo: builder.mutation({
      query: ({ chapterNumber, content }) => {
        return {
          url: `/admin/chapters/${chapterNumber}/info`,
          method: "PATCH",
          body: { content: content },
        };
      },
      invalidatesTags: ["ChapterInfo"],
    }),
    updateChapter: builder.mutation({
      query: ({ number, title }) => {
        return {
          url: `/admin/chapters/${number}`,
          method: "PATCH",
          body: { number, title },
        };
      },
      invalidatesTags: ["ChapterTitle"],
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
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useGetChapterTitleQuery,
  useGetChapterInfoQuery,
  useUpdateChapterInfoMutation,
} = chapterApi;
