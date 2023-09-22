import { Text, useToken, Icon, View, useColorModeValue } from "native-base";
import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { FavoriteNewsScreen, NewsScreen, WeatherScreen } from "../screens";
import { NavigatorParamList, RootStackNavProps } from "./app-navigator";
import { StackScreenProps } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
export type HomeStackNavParamList = {
  news: undefined;
  favorites: undefined;
  weather: undefined;
};

export type HomeStackNavProps = StackScreenProps<HomeStackNavParamList>;

export type HomeTabsNavParamList = {
  news: undefined;
  favorites: undefined;
  weather: undefined;
};

export type HomeTabsNavProps<T extends keyof HomeTabsNavParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsNavParamList, T>,
    RootStackNavProps<keyof NavigatorParamList>
  >;

const Tab = createBottomTabNavigator<HomeTabsNavParamList>();

export type HeaderOptionsProps = {
  bgColor?: string;
  title?: string;
};

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabBarIcons = {
    news: { name: "dashboard", as: MaterialIcons },
    favorites: { name: "favorite", as: MaterialIcons },
    weather: { name: "cloud", as: MaterialIcons },
  };

  return (
    <View
      style={{
        flexDirection: "column",
      }}
      shadow={5}
    >
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                as={tabBarIcons[route.name as keyof typeof tabBarIcons].as}
                name={tabBarIcons[route.name as keyof typeof tabBarIcons].name}
                size="24px"
                color={
                  isFocused
                    ? options.tabBarActiveTintColor
                    : options.tabBarInactiveTintColor
                }
              />
              <Text
                fontSize="2xs"
                textTransform="uppercase"
                pt={2}
                color={
                  isFocused
                    ? options.tabBarActiveTintColor
                    : options.tabBarInactiveTintColor
                }
              >
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const HomeTabsNavigator = () => {
  const [light, black, white] = useToken("colors", [
    "light.400",
    "black",
    "white",
  ]);
  const tabBarActiveTintColor = useColorModeValue(black, white);
  return (
    <Tab.Navigator
      initialRouteName="news"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: light,
        tabBarActiveTintColor,
        tabBarStyle: {
          position: "absolute",
        },
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="news"
        component={NewsScreen}
        options={{
          title: "News",
        }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoriteNewsScreen}
        options={{
          title: "Favorites News",
        }}
      />
      <Tab.Screen
        name="weather"
        component={WeatherScreen}
        options={{
          title: "Weather",
        }}
      />
    </Tab.Navigator>
  );
};
