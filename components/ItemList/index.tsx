import { Flex, Icon, Pressable, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export type IListItem = {
  id: string;
  title: string;
  isFavourite: boolean;
  description: string;
};

interface ListItemProps {
  item: IListItem;
  onPressItem: (id: string) => void;
}

export const ListItem = ({ item, onPressItem }: ListItemProps) => {
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
      <Icon
        size="s"
        color={item.isFavourite ? "red.600" : "gray.400"}
        as={AntDesign}
        name="heart"
      />
      <Flex flexDirection="row" justifyContent="center">
        <Flex justifyContent="center">
          <Text>{item.title}</Text>
        </Flex>
      </Flex>
      <Icon size="s" as={AntDesign} name="right" />
    </Pressable>
  );
};
