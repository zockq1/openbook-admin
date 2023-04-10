import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChapterListModel } from "../../types/chapterTypes";
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
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApi;
