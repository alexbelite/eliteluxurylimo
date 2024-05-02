"use client";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";
import session from "redux-persist/lib/storage/session";
import googleMapSlice from "./googleMapSlice";
import UserReducer from "@/store/userSlice";
import ReservationFormReducer from "@/store/ReservationFormSlice";

const rootReducer = combineReducers({
  map: googleMapSlice,
  user: UserReducer,
  reservationForm: ReservationFormReducer,
});

const persistConfig = {
  key: "root",
  storage: session,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
      devTools: true,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
