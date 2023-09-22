import { View } from "react-native";
import { Image, Text, Button } from "native-base";
import { RootStackNavProps } from "../../navigators";

export const ArticleDetailsScreen = (
  props: RootStackNavProps<"article-details">
) => {
  const { article, isFavorite } = props.route.params;

  return (
    <View>
      {/* <Image alt="" /> */}
      <Text>{article.title}</Text>
      <Text>{article.author}</Text>
      <Text>{article.description}</Text>
      <Button>Read more</Button>
    </View>
  );
};
