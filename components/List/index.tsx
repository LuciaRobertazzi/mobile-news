import { Text, FlatList, Spinner } from "native-base";
import { ListItem, IListItem } from "../ItemList";

interface ListProps<T> {
  list: IListItem<T>[];
  onPressItem: (id: string) => void;
  noContentText?: string;
  onEndReached?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
}

export const List = <T extends Record<string, any>>({
  list,
  onPressItem,
  noContentText,
  onEndReached,
  onRefresh,
  isLoading,
  isRefreshing,
}: ListProps<T>) => {
  return (
    <FlatList
      data={list}
      minH={300}
      padding={2}
      renderItem={({ item }) => (
        <ListItem item={item} onPressItem={onPressItem} />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      ListFooterComponent={() => (isLoading ? <Spinner /> : null)}
      ListEmptyComponent={() => (
        <Text mt={4} alignSelf={"center"}>
          {noContentText || ""}
        </Text>
      )}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
};
