import React from "react";
import { View } from "react-native";
import RecentlyViewedScreen from "../screens/RecentlyViewedScreen";
import MyFavouritesScreen from "../screens/MyFavouritesScreen";
import FavouritedMeScreen from "../screens/FavouritedMeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BlockedScreen from "../screens/BlockedScreen";
import ViewedMeScreen from "../screens/ViewedMeScreen";

function InterestsTopTab() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          style: { backgroundColor: "dodgerblue" },
          scrollEnabled: true,
        }}
        swipeEnabled={true}
        removeClippedSubviews={false}
      >
        <Tab.Screen name="Recently Viewed" component={RecentlyViewedScreen} />
        <Tab.Screen name="My Favourites" component={MyFavouritesScreen} />
        <Tab.Screen name="Favourited Me" component={FavouritedMeScreen} />
        <Tab.Screen name="Viewed Me" component={ViewedMeScreen} />
        <Tab.Screen name="Blocked" component={BlockedScreen} />
      </Tab.Navigator>
    </>
  );
}
export default InterestsTopTab;
