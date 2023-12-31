import { Flex, Icon, Pressable, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export type IListItem<T> = {
  id: string;
  data: T;
  title: string;
  isFavorite: boolean;
  description: string;
};

interface ListItemProps<T> {
  item: IListItem<T>;
  onPressItem: (id: string) => void;
  onPressFavorite: (item: T) => void;
}

export const ListItem = <T extends Record<string, any>>({
  item,
  onPressItem,
  onPressFavorite,
}: ListItemProps<T>) => {
  return (
    <Pressable
      onPress={() => onPressItem(item.id)}
      borderWidth={1}
      borderRadius="md"
      flexDirection="row"
      p={4}
      borderRightRadius="xl"
      borderColor="coolGray.200"
      alignItems="center"
      justifyContent="space-between"
      shadow="1"
      mb={3}
    >
      <Flex flexDirection="row" maxW={80} justifyContent="flex-start">
        <Pressable
          onPress={() => onPressFavorite(item.data)}
          alignSelf={"center"}
        >
          <Icon
            color={item.isFavorite ? "red.600" : "gray.400"}
            as={AntDesign}
            name="heart"
            marginRight={4}
          />
        </Pressable>

        <Flex>
          <Text>{item.title}</Text>
        </Flex>
      </Flex>
      <Icon as={AntDesign} name="right" />
    </Pressable>
  );
};
