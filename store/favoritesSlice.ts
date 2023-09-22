import { createSlice } from "@reduxjs/toolkit";
import { News } from ".";

const favoritesInitialState: {
  favorites: News[];
  urls: string[];
} = {
  favorites: [],
  urls: [],
};

const checkIfExists = (state = favoritesInitialState, article: News) => {
  return state.favorites.some((art) => art.url === article.url);
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: favoritesInitialState,
  reducers: {
    addToFavorite: (state, action: { payload: News }) => {
      const exists = checkIfExists(state, action.payload);
      if (exists) {
        return {
          urls: state.urls.filter((art) => art !== action.payload.url),
          favorites: state.favorites.filter(
            (art) => art.url !== action.payload.url
          ),
        };
      }
      return {
        urls: [...state.urls, action.payload.url],
        favorites: [...state.favorites, action.payload],
      };
    },
  },
});

export const { addToFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
