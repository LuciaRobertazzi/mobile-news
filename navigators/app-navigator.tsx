import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewsScreen, ArticleDetailsScreen } from "../screens";
import { News } from "../store";

export const navigationRef = createNavigationContainerRef();

export type NavigatorParamList = {
  news: undefined;
  "article-details": {
    article: News;
    isFavorite: boolean;
  };
};

export type RootStackNavProps<T extends keyof NavigatorParamList> =
  NativeStackScreenProps<NavigatorParamList, T>;

export type NavigationProp<T extends keyof NavigatorParamList> =
  StackNavigationProp<NavigatorParamList, T>;

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="news">
      <Stack.Screen name="news" component={NewsScreen} />
      <Stack.Screen name="article-details" component={ArticleDetailsScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <AppStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};
