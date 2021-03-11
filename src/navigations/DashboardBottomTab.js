import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RequestScreen from "../screens/RequestScreen";
import Dashboard from "../screens/Dashboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import SurveyScreen from "../screens/SurveyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardTopTab from "./DashboardTopTab";

const Tab = createBottomTabNavigator();
function DashboardBottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
        activeBackgroundColor: "red",
        inactiveBackgroundColor: "red",
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardTopTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
          // tabBarBadge:4
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          tabBarLabel: "   Request",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-plus-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-search"
              color={color}
              size={35}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Survey"
        component={SurveyScreen}
        options={{
          tabBarLabel: "Survey",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default DashboardBottomTab;
