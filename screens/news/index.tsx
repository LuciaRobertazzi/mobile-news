import { useEffect } from "react";
import { View } from "react-native";
import {
  useAppSelector,
  useAppDispatch,
  fetchNews,
  News,
  addToFavorite,
} from "../../store";
import { List } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators";

export const NewsScreen = () => {
  const navigation = useNavigation<NavigationProp<"home">>();
  const news = useAppSelector((state) => state.news);
  const favoritesURL = useAppSelector((state) => state.favorites.urls);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNews({}));
  }, []);

  const handleSelectFavorite = (item: News) => {
    dispatch(addToFavorite(item));
  };
  const handleSelectArticle = (id: string) => {
    const articleSelected = news.news.find((article) => article.url === id);
    if (articleSelected) {
      navigation.navigate("article-details", {
        article: articleSelected,
      });
    }
  };

  return (
    <View>
      <List<News>
        onPressItem={handleSelectArticle}
        onPressFavorite={handleSelectFavorite}
        list={news.news.map((art) => ({
          data: art,
          title: art.title,
          description: art.description,
          id: art.url,
          isFavorite: favoritesURL.includes(art.url),
        }))}
        isLoading={news.loading}
        noContentText={news.error}
      />
    </View>
  );
};
