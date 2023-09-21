import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./newsSlice";

const store = configureStore({
  reducer: {
    news: newsSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
