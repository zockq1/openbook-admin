import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddTopicModel,
  GetTopicModel,
  TopicListModel,
  TopicOrderModel,
  UpdateTopicModel,
} from "../../types/topicTypes";
import baseQueryWithReauth from "./baseApi";

export const topicApi = createApi({
  reducerPath: "topicApi",
  tagTypes: ["TopicList", "TopicInfo"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTopic: builder.query<GetTopicModel, string>({
      query: (title) => `/admin/topics/${title}`,
      providesTags: ["TopicInfo"],
    }),
    getChapterTopicList: builder.query<TopicListModel, number>({
      query: (chapter) => `/admin/chapters/${chapter}/topics`,
      providesTags: ["TopicList"],
    }),
    addTopic: builder.mutation<void, AddTopicModel>({
      query: (topic) => {
        return {
          url: `/admin/topics`,
          method: "POST",
          body: topic,
        };
      },
      invalidatesTags: ["TopicList"],
    }),
    updateTopic: builder.mutation<void, UpdateTopicModel>({
      query: ({ updatedTopic, prevTitle }: UpdateTopicModel) => {
        return {
          url: `/admin/topics/${prevTitle}`,
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
      invalidatesTags: ["TopicList", "TopicInfo"],
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
  useLazyGetTopicQuery,
  useGetChapterTopicListQuery,
  useLazyGetChapterTopicListQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useUpdateTopicOrderMutation,
  useDeleteTopicMutation,
} = topicApi;
