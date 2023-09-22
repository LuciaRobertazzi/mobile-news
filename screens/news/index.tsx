import { useEffect } from "react";
import { View } from "react-native";
import { useAppSelector, useAppDispatch, fetchNews, News } from "../../store";
import { List } from "../../components";

export const NewsScreen = () => {
  const news = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNews({}));
  }, []);

  return (
    <View>
      <List<News>
        onPressItem={(id) => console.log(id)}
        list={news.news.map((art) => ({
          data: art,
          title: art.title,
          description: art.description,
          id: art.url,
          isFavourite: !!art.source,
        }))}
      />
    </View>
  );
};
