import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setAccessToken, setRefreshToken } from "../slices/authSlice";

const baseQueryWithJWT = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  responseHandler: "text",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.refreshToken;
    if (token) {
      headers.set("Refresh-Token", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithJWT(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQueryWithRefresh(
      "refresh-token",
      api,
      extraOptions
    );
    if (refreshResult.meta?.response?.headers.get("Refresh-Token")) {
      api.dispatch(
        setRefreshToken(
          refreshResult.meta?.response?.headers.get("Refresh-Token")
        )
      );
      api.dispatch(
        setAccessToken(
          refreshResult.meta?.response?.headers.get("Authorization")
        )
      );
      result = await baseQueryWithJWT(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export default baseQueryWithReauth;
