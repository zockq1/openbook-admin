import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddChapterModel,
  ChapterDateModel,
  ChapterOrderModel,
  ChapterTitleModel,
  GetChapterInfoModel,
  GetChapterModel,
  UpdateChapterInfoModel,
  UpdateChapterModel,
} from "../../types/chapterTypes";
import baseQueryWithReauth from "./baseApi";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ChapterList", "ChapterTitle", "ChapterInfo"],
  endpoints: (builder) => ({
    getChapters: builder.query<GetChapterModel, void>({
      query: () => "/admin/chapters",
      providesTags: ["ChapterList"],
    }),
    getChapterTitle: builder.query<ChapterTitleModel, number>({
      query: (chapterNumber) => `/chapters/chapter-title?num=${chapterNumber}`,
      providesTags: ["ChapterTitle"],
    }),
    getChapterInfo: builder.query<GetChapterInfoModel, number>({
      query: (chapterNumber) => `/chapters/${chapterNumber}/info`,
      providesTags: ["ChapterInfo"],
    }),
    getChapterDate: builder.query<ChapterDateModel, number>({
      query: (chapterNumber) => `/chapters/${chapterNumber}/date`,
      providesTags: ["ChapterTitle"],
    }),
    addChapter: builder.mutation<void, AddChapterModel>({
      query: (newChapter: AddChapterModel) => {
        return {
          url: `/admin/chapters`,
          method: "POST",
          body: newChapter,
        };
      },
      invalidatesTags: ["ChapterList"],
    }),
    updateChapterInfo: builder.mutation<void, UpdateChapterInfoModel>({
      query: ({ chapterNumber, content }) => {
        return {
          url: `/admin/chapters/${chapterNumber}/info`,
          method: "PATCH",
          body: { content: content },
        };
      },
      invalidatesTags: ["ChapterInfo"],
    }),
    updateChapter: builder.mutation<void, UpdateChapterModel>({
      query: ({ editedChapter, currentChapterNumber }: UpdateChapterModel) => {
        return {
          url: `/admin/chapters/${currentChapterNumber}`,
          method: "PATCH",
          body: editedChapter,
        };
      },
      invalidatesTags: ["ChapterTitle", "ChapterList"],
    }),
    updateChapterOrder: builder.mutation<void, ChapterOrderModel[]>({
      query: (chapterList) => {
        return {
          url: `/admin/chapter-numbers`,
          method: "PATCH",
          body: chapterList,
        };
      },
      invalidatesTags: ["ChapterList", "ChapterInfo"],
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
  useUpdateChapterOrderMutation,
} = chapterApi;
