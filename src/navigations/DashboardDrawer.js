import React from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Alert, ToastAndroid } from "react-native";
import Dashboard from "../screens/Dashboard";
import DashboardBottomTab from "./DashboardBottomTab";
import DashboardTopTab from "./DashboardTopTab";
import InterestsScreen from "../screens/InterestsScreen";
import SettingScreen from "../screens/SettingScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import MessageScreen from "../screens/MessageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import Signin from "../screens/SigninScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../service/Api";
import { Icon } from "react-native-elements";

function DashboardDrawer({ navigation }) {
  function CustomDrawerContent(props) {
    const Logoutfunc = () => {
      Api.logout(global.deviceid, global.devicetoken);
      AsyncStorage.removeItem("mygomarry_token");
      ToastAndroid.show("Logged out Sucessfully", ToastAndroid.SHORT);
      navigation.navigate("Signin");
    };
    const chkfunc = () => {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Confirm", onPress: () => Logoutfunc() },
        ],
        { cancelable: false }
      );
    };

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={chkfunc}
          icon={({ focused, color, size }) => (
            <Icon
              name="log-out"
              type="entypo"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          )}
        />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#e91e63",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardBottomTab}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              type="entypo"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="message"
              type="entypo"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Interests"
        component={InterestsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="info-with-circle"
              type="entypo"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="bell-alt"
              type="fontisto"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="player-settings"
              type="fontisto"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Help & Support"
        component={HelpSupportScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="help-with-circle"
              type="entypo"
              color={focused ? "#e91e63" : "grey"}
              size={20}
            ></Icon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default DashboardDrawer;
