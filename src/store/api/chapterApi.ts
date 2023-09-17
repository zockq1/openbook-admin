import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterDateModel,
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
  UpdateChapterModel,
} from "../../types/chapterTypes";
import baseQueryWithReauth from "./baseApi";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ChapterList", "ChapterTitle", "ChapterInfo"],
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterModel[], void>({
      query: () => "/admin/chapters",
      providesTags: ["ChapterList"],
    }),
    getChapterTitle: builder.query<ChapterTitleModel, number>({
      query: (chapterNumber) => `/chapters/chapter-title?num=${chapterNumber}`,
      providesTags: ["ChapterTitle"],
    }),
    getChapterInfo: builder.query<ChapterInfoModel, number>({
      query: (chapterNumber) => `/chapters/${chapterNumber}/info`,
      providesTags: ["ChapterInfo"],
    }),
    getChapterDate: builder.query<ChapterDateModel, number>({
      query: (chapterNumber) => `/chapters/${chapterNumber}/date`,
      providesTags: ["ChapterTitle"],
    }),
    addChapter: builder.mutation<any, ChapterModel>({
      query: (newChapter: ChapterModel) => {
        return {
          url: `/admin/chapters`,
          method: "POST",
          body: newChapter,
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
    updateChapter: builder.mutation<any, UpdateChapterModel>({
      query: ({ editedChapter, currentChapterNumber }: UpdateChapterModel) => {
        return {
          url: `/admin/chapters/${currentChapterNumber}`,
          method: "PATCH",
          body: editedChapter,
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
  useLazyGetChapterTitleQuery,
  useGetChapterDateQuery,
  useLazyGetChapterDateQuery,
  useGetChapterInfoQuery,
  useLazyGetChapterInfoQuery,
  useUpdateChapterInfoMutation,
} = chapterApi;
