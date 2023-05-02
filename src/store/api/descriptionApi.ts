import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddDescriptionModel,
  DescriptionModel,
  UpdateDescriptionModel,
} from "../../types/descriptionType";

export const descriptionApi = createApi({
  reducerPath: "descriptionApi",
  tagTypes: ["descriptionList"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getDescriptions: builder.query<DescriptionModel[], string>({
      query: (topicTitle) => `/topics/${topicTitle}/descriptions/`,
      providesTags: ["descriptionList"],
    }),
    addDescription: builder.mutation({
      query: (description: AddDescriptionModel) => {
        return {
          url: `/admin/descriptions/`,
          method: "POST",
          body: description,
        };
      },
      invalidatesTags: ["descriptionList"],
    }),
    updateDescription: builder.mutation({
      query: ({ content, descriptionId }: UpdateDescriptionModel) => {
        return {
          url: `/admin/descriptions/${descriptionId}`,
          method: "PATCH",
          body: { content },
        };
      },
      invalidatesTags: ["descriptionList"],
    }),
    deleteDescription: builder.mutation({
      query: (descriptionId: number) => {
        return {
          url: `/admin/descriptions/${descriptionId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["descriptionList"],
    }),
  }),
});

export const {
  useGetDescriptionsQuery,
  useAddDescriptionMutation,
  useUpdateDescriptionMutation,
  useDeleteDescriptionMutation,
} = descriptionApi;
