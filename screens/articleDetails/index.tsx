import { Linking } from "react-native";
import { Flex, Text, Button, Pressable, Icon } from "native-base";
import { RootStackNavProps } from "../../navigators";
import { AntDesign } from "@expo/vector-icons";

export const ArticleDetailsScreen = (
  props: RootStackNavProps<"article-details">
) => {
  const { article, isFavorite } = props.route.params;
  const handleReadMore = () => {
    Linking.canOpenURL(article.url).then((supported) => {
      if (supported) {
        Linking.openURL(article.url);
      }
    });
  };
  return (
    <Flex p={4} justifyContent={"space-between"} h={"100%"}>
      <Flex>
        <Text bold fontSize={32} textBreakStrategy="balanced">
          {article.title}
        </Text>
        <Text>{article.author}</Text>
        <Pressable
          marginBottom={8}
          marginTop={4}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Icon
            size="xl"
            color={isFavorite ? "red.600" : "gray.400"}
            as={AntDesign}
            name="heart"
            mr={4}
          />
        </Pressable>
        <Text fontSize={18}>{article.description}</Text>
      </Flex>
      <Flex>
        <Button bgColor={"red.500"} marginBottom={8} onPress={handleReadMore}>
          <Text color={"white"} fontSize={18} bold>
            Read more
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};
