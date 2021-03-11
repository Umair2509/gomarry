import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

function RequestApprovedScreen() {
  return (
    <View
      style={{
        marginTop: 50,
        flexDirection: "column",
      }}
    >
      <Icon
        name="account-search"
        type="material-community"
        color="grey"
        size={45}
      ></Icon>
      <Text
        style={{
          marginLeft: 145,
        }}
      >
        No User Found
      </Text>
    </View>
  );
}
export default RequestApprovedScreen;
