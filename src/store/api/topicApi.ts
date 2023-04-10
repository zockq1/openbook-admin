import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TopicListModel,
  TopicModel,
  UpdateTopicModel,
} from "../../types/topicTypes";
import apiUrl from "./config";

export const topicApi = createApi({
  reducerPath: "topicApi",
  tagTypes: ["TopicList"],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
    }),
    getChapterTopicList: builder.query<TopicListModel, number>({
      query: (chapter) => `/chapters/${chapter}/topics`,
      providesTags: ["TopicList"],
    }),
    addTopic: builder.mutation<any, TopicModel>({
      query: (topic: TopicModel) => {
        return {
          url: `/admin/topics`,
          method: "POST",
          body: topic,
        };
      },
      invalidatesTags: ["TopicList"],
    }),
    updateTopic: builder.mutation<any, UpdateTopicModel>({
      query: ({ updatedTopic, title }: UpdateTopicModel) => {
        return {
          url: `/admin/topics/${title}`,
          method: "PATCH",
          body: updatedTopic,
        };
      },
      invalidatesTags: ["TopicList"],
    }),
    deleteTopic: builder.mutation({
      query: ({ title }) => {
        return {
          url: `/admin/topics/${title}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["TopicList"],
    }),
  }),
});

export const {
  useGetTopicQuery,
  useGetChapterTopicListQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicApi;
