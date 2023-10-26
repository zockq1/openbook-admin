import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import {
  AddTimelineModel,
  DeleteTimelineModel,
  GetTimelineModel,
  UpdateTimelineModel,
} from "../../types/timelineTypes";

export const timelineApi = createApi({
  reducerPath: "timelineApi",
  tagTypes: ["TimelineList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTimelineList: builder.query<GetTimelineModel, void>({
      query: () => `/admin/time-lines`,
      providesTags: ["TimelineList"],
    }),
    addTimeline: builder.mutation<void, AddTimelineModel>({
      query: (timeline: AddTimelineModel) => {
        return {
          url: `/admin/time-lines`,
          method: "POST",
          body: timeline,
        };
      },
      invalidatesTags: ["TimelineList"],
    }),
    updateTimeline: builder.mutation<void, UpdateTimelineModel>({
      query: (updatedTimeline: UpdateTimelineModel) => {
        return {
          url: `/admin/time-lines/${updatedTimeline.id}`,
          method: "PATCH",
          body: updatedTimeline.updatedTimeline,
        };
      },
      invalidatesTags: ["TimelineList"],
    }),
    deleteTimeline: builder.mutation<void, DeleteTimelineModel>({
      query: (deleteTimelineId) => {
        return {
          url: `/admin/time-lines/${deleteTimelineId.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["TimelineList"],
    }),
  }),
});

export const {
  useGetTimelineListQuery,
  useLazyGetTimelineListQuery,
  useAddTimelineMutation,
  useDeleteTimelineMutation,
  useUpdateTimelineMutation,
} = timelineApi;
