import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import cards from "./cardsSlice";

export const store = configureStore({
  reducer: { cards },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
