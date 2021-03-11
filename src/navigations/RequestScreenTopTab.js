import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingRequestScreen from "../screens/PendingRequestScreen"
import RequestApprovedScreen from "../screens/RequestApprovedScreen"
function RequestScreenTopTab() {
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
         <Tab.Screen name="Pending Request" component={PendingRequestScreen} />
        <Tab.Screen name="Approved Request" component={RequestApprovedScreen} />
      </Tab.Navigator>
     
    </>
  );
}
export default RequestScreenTopTab;
