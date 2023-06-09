import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TopicListModel,
  TopicModel,
  UpdateTopicModel,
} from "../../types/topicTypes";

export const topicApi = createApi({
  reducerPath: "topicApi",
  tagTypes: ["TopicList", "TopicInfo"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
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
  useDeleteTopicMutation,
} = topicApi;
