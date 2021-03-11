import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserProfileDetailScreen from "../screens/UserProfileDetailScreen";
import PhotosScreen from "../screens/PhotosScreen";
import VideosScreen from "../screens/VideosScreen";
import { Badge } from "react-native-elements";

function ProfileCardTopTab(props) {
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
        <Tab.Screen
          name="Profile"
          component={() => (
            <UserProfileDetailScreen
              profiledetail={props.user_data}
              myprofile={props.myprofile}
              navigation={props.NAVIGATION}
            />
          )}
        />
        <Tab.Screen
          name="Photos"
          component={() => <PhotosScreen profiledetail={props.user_data} />}
        />
        <Tab.Screen
          name="Videos"
          component={() => <VideosScreen profiledetail={props.user_data} />}
        />
      </Tab.Navigator>
    </>
  );
}
export default ProfileCardTopTab;
