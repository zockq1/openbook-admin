import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChoiceModel, addChoiceModel } from "../../types/choiceType";

export const choicesApi = createApi({
  reducerPath: "choicesApi",
  tagTypes: ["ChoiceList"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getChoices: builder.query<ChoiceModel[], string>({
      query: (topicTitle) => `/admin/topics/${topicTitle}/choices/`,
      providesTags: ["ChoiceList"],
    }),
    addChoices: builder.mutation({
      query: (choices: addChoiceModel) => {
        return {
          url: `/admin/choices/`,
          method: "POST",
          body: choices,
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    updateChoice: builder.mutation({
      query: ({ id, content }) => {
        return {
          url: `/admin/choices/${id}`,
          method: "PATCH",
          body: { content },
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
    deleteChoice: builder.mutation({
      query: (id: number) => {
        return {
          url: `/admin/choices/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ChoiceList"],
    }),
  }),
});

export const {
  useGetChoicesQuery,
  useAddChoicesMutation,
  useUpdateChoiceMutation,
  useDeleteChoiceMutation,
} = choicesApi;
