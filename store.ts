// store.ts or store.js (if you're using TypeScript)
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./src/restodata";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
