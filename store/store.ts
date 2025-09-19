import { configureStore } from "@reduxjs/toolkit";
import boxesReducer from "./boxesSlice";
import boxDetailsReducer from "./boxDetailsSlice";

export const store = configureStore({
  reducer: {
    boxes: boxesReducer,
    boxDetails: boxDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
