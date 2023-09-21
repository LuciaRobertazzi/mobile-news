import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const apiKey = "9812a679d7604ee1976e0e39e1a52df1";

export type News = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type Category =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

interface newsParameters {
  searchString?: string;
  category?: Category;
  page?: number;
}

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  ({ page = 1, searchString, category }: newsParameters) => {
    return axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchString}&pageSize=15&page=${page}&apiKey=${apiKey}`
      )
      .then((response) => response.data.articles);
  }
);

const newsInitialState: {
  loading: boolean;
  news: News[];
  error: string;
} = {
  loading: false,
  news: [],
  error: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState: newsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNews.fulfilled,
      (state, action: PayloadAction<News[]>) => {
        state.loading = false;
        state.news = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.news = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default newsSlice.reducer;