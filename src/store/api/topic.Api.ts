import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopicListModel, TopicModel } from "../../types/topicTypes";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getTopicList: builder.query<TopicListModel, number | null>({
      query: (chapter) => `/topics/${chapter}`,
    }),
    getTopic: builder.query<TopicModel, string | undefined>({
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
    updateTopic: builder.mutation({
      query: ({
        chapter,
        title,
        category,
        startDate,
        endDate,
        detail,
        keywordList,
      }) => {
        return {
          url: `/admin/topics/${title}`,
          method: "PATCH",
          body: {
            chapter,
            title,
            category,
            startDate,
            endDate,
            detail,
            keywordList,
          },
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
