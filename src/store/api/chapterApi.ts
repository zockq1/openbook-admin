import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChapterModel, ChapterTitleModel } from "../../types/chapterTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  tagTypes: ["ChapterList", "ChapterTitle"],
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
} = chapterApi;
