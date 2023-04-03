// import { configureStore } from "@reduxjs/toolkit";
// import chapterReducer from "./slices/chapterSlice";
// import authReducer from "./slices/authSlice";
// import { chapterApi } from "./api/chapterApi";
// import { topicApi } from "./api/topic.Api";
// import { authApi } from "./api/authApi";

// export const store = configureStore({
//   reducer: {
//     chapter: chapterReducer,
//     auth: authReducer,
//     [chapterApi.reducerPath]: chapterApi.reducer,
//     [topicApi.reducerPath]: topicApi.reducer,
//     [authApi.reducerPath]: authApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       chapterApi.middleware,
//       topicApi.middleware,
//       authApi.middleware
//     ),
// });

// export type RootState = ReturnType<typeof store.getState>;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chapterReducer from "./slices/chapterSlice";
import authReducer from "./slices/authSlice";
import { chapterApi } from "./api/chapterApi";
import { topicApi } from "./api/topicApi";
import { authApi } from "./api/authApi";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(chapterApi.middleware, topicApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
