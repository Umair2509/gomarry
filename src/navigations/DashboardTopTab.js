import React from "react";
import { create } from "react-test-renderer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import InMyAreaScreen from "../screens/InMyAreaScreen";
import MostPopularScreen from "../screens/MostPopularScreen";
import RecentlyOnlineScreen from "../screens/RecentlyOnlineScreen";
import MostCompatibleScreen from "../screens/MostCompatibleScreen";
import NewestMembersScreen from "../screens/NewestMembersScreen";
import { View } from "react-native";
import DashboardHeader from "../components/DashboardHeader";
import { flatMap } from "lodash";

const Tab = createMaterialTopTabNavigator();

function DashboardTopTab({ navigation }) {
  return (
    <>
      <DashboardHeader navigation={navigation} />

      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          style: { backgroundColor: "dodgerblue" },
          scrollEnabled: true,
        }}
        swipeEnabled={true}
        removeClippedSubviews={false}
      >
        <Tab.Screen name="Most popular" component={MostPopularScreen} />
        <Tab.Screen name="Recently Online" component={RecentlyOnlineScreen} />
        <Tab.Screen name="Most Compatible" component={MostCompatibleScreen} />
        <Tab.Screen name="Newest Members" component={NewestMembersScreen} />
        <Tab.Screen name="In My Area" component={InMyAreaScreen} />
      </Tab.Navigator>
    </>
  );
}
export default DashboardTopTab;
