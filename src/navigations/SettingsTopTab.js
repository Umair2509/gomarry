import React from "react";
import { View } from "react-native";
import AccountScreen from "../screens/AccountScreen";
import MembershipScreen from "../screens/MembershipScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function SettingsTopTab() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          style: { backgroundColor: "dodgerblue" },
          scrollEnabled: false,
        }}
        swipeEnabled={true}
        removeClippedSubviews={false}
      >
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Membership" component={MembershipScreen} />
      </Tab.Navigator>
    </>
  );
}
export default SettingsTopTab;
