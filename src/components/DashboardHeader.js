import React from "react";
import { View } from "react-native";
import { Header, Icon } from "react-native-elements";
import DashboardDrawer from "../navigations/DashboardDrawer";
import { DrawerActions } from "@react-navigation/native";
import MessageScreen from "../screens/MessageScreen";
import NotificationScreen from "../screens/NotificationScreen";

export default function DashboardHeader({ navigation }) {
  return (
    <View>
      <Header
        placement="left"
        containerStyle={{
          backgroundColor: "red",
          justifyContent: "space-around",
        }}
        leftComponent={
          <Icon
            name="menu"
            type="Ionicons"
            color="#fff"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        }
        centerComponent={{
          text: "GOMARRY",
          style: { color: "#fff", fontSize: 22, fontWeight: "bold" },
        }}
        rightComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="message"
              type="MaterialIcons"
              color="#fff"
              onPress={() => navigation.navigate("MessageScreen")}
            />
            <Icon
              containerStyle={{ marginLeft: 15, marginRight: 8 }}
              name="bell"
              type="font-awesome"
              color="#fff"
              onPress={() => navigation.navigate("NotificationScreen")}
            />
            <View style={{ flexDirection: "column" }}>
              <Icon
                name="keyboard-arrow-up"
                type="MaterialIcons"
                color="#fff"
                style={{ marginBottom: -7 }}
              />
              <Icon
                name="keyboard-arrow-down"
                type="MaterialIcons"
                color="#fff"
              />
            </View>
          </View>
        }
      ></Header>
    </View>
  );
}
