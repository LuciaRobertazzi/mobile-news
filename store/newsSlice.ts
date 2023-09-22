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

interface newsParameters {
  searchString?: string;
  page?: number;
}

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  ({ page = 1, searchString }: newsParameters) => {
    return axios
      .get(
        `https://newsapi.org/v2/everything?language=en&q=${searchString}&pageSize=15&page=${page}&apiKey=${apiKey}`
      )
      .then((response) => ({
        articles: response.data.articles,
        append: page !== 1,
      }));
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
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      if (!action.payload.append) {
        state.news = action.payload.articles;
      } else {
        state.news = [...state.news, ...action.payload.articles].filter(
          (obj, index, self) => {
            return index === self.findIndex((el) => el.url === obj.url);
          }
        );
      }
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.news = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default newsSlice.reducer;
