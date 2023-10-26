import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import keywordReducer from "./slices/keywordSlice";
import { chapterApi } from "./api/chapterApi";
import { topicApi } from "./api/topicApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { choicesApi } from "./api/choicesApi";
import { descriptionApi } from "./api/descriptionApi";
import { keywordApi } from "./api/keywordApi";
import { roundApi } from "./api/roundApi";
import { questionApi } from "./api/questionApi";
import { eraApi } from "./api/eraApi";
import { timelineApi } from "./api/timelineApi";
import { JJHApi } from "./api/JJHApi";
import { questionCategoryApi } from "./api/questionCategoryApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "keyword"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  [chapterApi.reducerPath]: chapterApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [choicesApi.reducerPath]: choicesApi.reducer,
  [descriptionApi.reducerPath]: descriptionApi.reducer,
  [keywordApi.reducerPath]: keywordApi.reducer,
  [roundApi.reducerPath]: roundApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [eraApi.reducerPath]: eraApi.reducer,
  [timelineApi.reducerPath]: timelineApi.reducer,
  [JJHApi.reducerPath]: JJHApi.reducer,
  [questionCategoryApi.reducerPath]: questionCategoryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      chapterApi.middleware,
      topicApi.middleware,
      authApi.middleware,
      categoryApi.middleware,
      choicesApi.middleware,
      descriptionApi.middleware,
      keywordApi.middleware,
      roundApi.middleware,
      questionApi.middleware,
      eraApi.middleware,
      timelineApi.middleware,
      JJHApi.middleware,
      questionApi.middleware,
      questionCategoryApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
