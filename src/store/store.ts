import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chapterReducer from "./slices/chapterSlice";
import authReducer from "./slices/authSlice";
import { chapterApi } from "./api/chapterApi";
import { topicApi } from "./api/topicApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { choicesApi } from "./api/choicesApi";
import { descriptionApi } from "./api/descriptionApi";
import { keywordApi } from "./api/KeywordApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chapter", "auth"],
};

const rootReducer = combineReducers({
  chapter: chapterReducer,
  auth: authReducer,
  [chapterApi.reducerPath]: chapterApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [choicesApi.reducerPath]: choicesApi.reducer,
  [descriptionApi.reducerPath]: descriptionApi.reducer,
  [keywordApi.reducerPath]: keywordApi.reducer,
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
      keywordApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
