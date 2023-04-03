import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopicModel } from "../../types/topicTypes";
import apiUrl from "./config";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
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
    updateTopic: builder.mutation<any, any>({
      query: ({ topic, title }) => {
        return {
          url: `/admin/topics/${title}`,
          method: "PATCH",
          body: topic,
        };
      },
    }),
    deleteTopic: builder.mutation({
      query: ({ title }) => {
        return {
          url: `/admin/topics/${title}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetTopicQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicApi;
