import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddDescriptionModel,
  AddDuplicationChoiceModel,
  DeleteDuplicationChoiceModel,
  DescriptionModel,
  DuplicationChoiceModel,
  UpdateDescriptionModel,
} from "../../types/descriptionType";

export const descriptionApi = createApi({
  reducerPath: "descriptionApi",
  tagTypes: ["descriptionList", "duplicationList"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getDescriptions: builder.query<DescriptionModel[], string>({
      query: (topicTitle) => `/topics/${topicTitle}/descriptions/`,
      providesTags: ["descriptionList"],
    }),
    getDuplicationChoice: builder.query<DuplicationChoiceModel[], number>({
      query: (descriptionId: number) => `/admin/dup-contents/${descriptionId}`,
      providesTags: ["duplicationList"],
    }),
    addDescription: builder.mutation({
      query: (descriptions: AddDescriptionModel) => {
        return {
          url: `/admin/descriptions/`,
          method: "POST",
          body: descriptions,
        };
      },
      invalidatesTags: ["descriptionList"],
    }),
    addDuplicationChoice: builder.mutation({
      query: (data: AddDuplicationChoiceModel) => {
        return {
          url: `/admin/dup-contents/${data.descriptionId}`,
          method: "POST",
          body: {
            choiceList: data.choiceList,
          },
        };
      },
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
    deleteDuplicationChoice: builder.mutation({
      query: (data: DeleteDuplicationChoiceModel) => {
        return {
          url: `/admin/dup-contents/${data.descriptionId}`,
          method: "Delete",
          body: {
            choiceList: data.choiceId,
          },
        };
      },
    }),
  }),
});

export const {
  useGetDescriptionsQuery,
  useGetDuplicationChoiceQuery,
  useAddDescriptionMutation,
  useAddDuplicationChoiceMutation,
  useUpdateDescriptionMutation,
  useDeleteDescriptionMutation,
  useDeleteDuplicationChoiceMutation,
} = descriptionApi;
