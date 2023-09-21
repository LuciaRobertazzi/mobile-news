import { useEffect } from "react";
import { View, Text } from "react-native";
import { useAppSelector, useAppDispatch, fetchNews } from "../../store";

export const NewsScreen = () => {
  const news = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <View>
      <Text>News Screen</Text>
    </View>
  );
};
