import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { View, StatusBar, Text, BackHandler } from "react-native";
import Api from "../../service/Api";
import DashboardHeader from "../components/DashboardHeader";
import DashboardTopTab from "../navigations/DashboardTopTab";

export default function Dashboard({ navigation }) {
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="red"
        translucent={true}
      />
      <DashboardHeader navigation={navigation} />
      {/* <Text>Hello</Text> */}
    </View>
  );
}
