import { configureStore } from "@reduxjs/toolkit";
import chapterReducer from "./slices/chapterSlice";
import authReducer from "./slices/authSlice";
import { chapterApi } from "./api/chapterApi";
import { topicApi } from "./api/topic.Api";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    chapter: chapterReducer,
    auth: authReducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      chapterApi.middleware,
      topicApi.middleware,
      authApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
