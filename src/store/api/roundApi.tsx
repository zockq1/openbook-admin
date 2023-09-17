import { createApi } from "@reduxjs/toolkit/query/react";
import {
  RoundDateModel,
  RoundModel,
  UpdateRoundModel,
} from "../../types/roundTypes";
import baseQueryWithReauth from "./baseApi";

export const roundApi = createApi({
  reducerPath: "roundApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["RoundList"],
  endpoints: (builder) => ({
    getRounds: builder.query<RoundModel[], void>({
      query: () => "/rounds",
      providesTags: ["RoundList"],
    }),
    getRoundDate: builder.query<RoundDateModel, number>({
      query: (roundNumber) => `/rounds/${roundNumber}`,
      providesTags: ["RoundList"],
    }),
    addRound: builder.mutation<any, RoundModel>({
      query: (newRound: RoundModel) => {
        return {
          url: `/admin/rounds`,
          method: "POST",
          body: newRound,
        };
      },
      invalidatesTags: ["RoundList"],
    }),
    updateRound: builder.mutation<any, UpdateRoundModel>({
      query: ({ roundNumber, updatedRound }: UpdateRoundModel) => {
        return {
          url: `/admin/rounds/${roundNumber}`,
          method: "PATCH",
          body: updatedRound,
        };
      },
      invalidatesTags: ["RoundList"],
    }),
    deleteRound: builder.mutation<any, number>({
      query: (roundNumber) => {
        return {
          url: `/admin/rounds/${roundNumber}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["RoundList"],
    }),
  }),
});

export const {
  useGetRoundsQuery,
  useGetRoundDateQuery,
  useLazyGetRoundDateQuery,
  useAddRoundMutation,
  useUpdateRoundMutation,
  useDeleteRoundMutation,
} = roundApi;
