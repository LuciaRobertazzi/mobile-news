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

export const FavoriteNewsScreen = () => {
  const navigation = useNavigation<NavigationProp<"home">>();
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNews({}));
  }, []);

  const handleSelectFavorite = (item: News) => {
    dispatch(addToFavorite(item));
  };
  const handleSelectArticle = (id: string) => {
    const articleSelected = favorites.favorites.find(
      (article) => article.url === id
    );
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
        list={favorites.favorites.map((art) => ({
          data: art,
          title: art.title,
          description: art.description,
          id: art.url,
          isFavorite: !!art.source,
        }))}
        noContentText="You don't have any favorites yet!"
      />
    </View>
  );
};
