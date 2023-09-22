import { useEffect } from "react";
import { View } from "react-native";
import { useAppSelector, useAppDispatch, fetchNews, News } from "../../store";
import { List } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators";

export const NewsScreen = () => {
  const navigation = useNavigation<NavigationProp<"news">>();
  const news = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNews({}));
  }, []);

  const handleSelectArticle = (id: string) => {
    const articleSelected = news.news.find((article) => article.url === id);
    if (articleSelected) {
      navigation.navigate("article-details", {
        article: articleSelected,
        isFavorite: true,
      });
    }
  };

  return (
    <View>
      <List<News>
        onPressItem={handleSelectArticle}
        list={news.news.map((art) => ({
          data: art,
          title: art.title,
          description: art.description,
          id: art.url,
          isFavourite: !!art.source,
        }))}
        isLoading={news.loading}
        noContentText={news.error}
      />
    </View>
  );
};
