import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopicListModel, TopicModel } from "../../types/topicTypes";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTopicList: builder.query<TopicListModel, number | null>({
      query: (chapter) => `/topics/${chapter}`,
    }),
    getTopic: builder.query<TopicModel, any>({
      query: ({ title, chapter }) => `/topics/${chapter}/${title}`,
    }),
    addTopic: builder.mutation<any, TopicModel>({
      query: (topic: TopicModel) => {
        return {
          url: `/admin/topics`,
          method: "POST",
          body: topic,
        };
      },
    }),
    updateTopic: builder.mutation<any, TopicModel>({
      query: (topic: TopicModel) => {
        return {
          url: `/admin/topics/${topic.title}`,
          method: "PATCH",
          body: topic,
        };
      },
    }),
    deleteTopic: builder.mutation({
      query: ({ chapter, title }) => {
        return {
          url: `/admin/topics/${title}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetTopicListQuery,
  useGetTopicQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicApi;
