import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticleDetailsScreen } from "../screens";
import { News } from "../store";
import { HomeTabsNavParamList, HomeTabsNavigator } from "./home-tabs-navigator";

export const navigationRef = createNavigationContainerRef();

export type NavigatorParamList = {
  home: NavigatorScreenParams<HomeTabsNavParamList>;
  "article-details": {
    article: News;
  };
};

export type RootStackNavProps<T extends keyof NavigatorParamList> =
  NativeStackScreenProps<NavigatorParamList, T>;

export type NavigationProp<T extends keyof NavigatorParamList> =
  StackNavigationProp<NavigatorParamList, T>;

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeTabsNavigator}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="article-details"
        component={ArticleDetailsScreen}
        options={{
          title: "Article Details",
        }}
      />
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
