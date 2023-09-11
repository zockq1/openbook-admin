import { createApi } from "@reduxjs/toolkit/query/react";
import {
  TopicListModel,
  TopicModel,
  TopicOrderModel,
  UpdateTopicModel,
} from "../../types/topicTypes";
import baseQueryWithReauth from "./baseApi";

export const topicApi = createApi({
  reducerPath: "topicApi",
  tagTypes: ["TopicList", "TopicInfo"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/admin/topics/${title}`,
      providesTags: ["TopicInfo"],
    }),
    getChapterTopicList: builder.query<TopicListModel[], number>({
      query: (chapter) => `/admin/chapters/${chapter}/topics`,
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
      invalidatesTags: ["TopicList", "TopicInfo"],
    }),
    updateTopicOrder: builder.mutation<any, TopicOrderModel[]>({
      query: (topicList) => {
        return {
          url: `/admin/topic-numbers`,
          method: "PATCH",
          body: topicList,
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
      invalidatesTags: ["TopicList", "TopicInfo"],
    }),
  }),
});

export const {
  useGetTopicQuery,
  useGetChapterTopicListQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useUpdateTopicOrderMutation,
  useDeleteTopicMutation,
} = topicApi;
