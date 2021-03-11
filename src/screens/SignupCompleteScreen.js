import React from "react";
import { ImageBackground } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SignupStage2Screen from "./SignupStage2Screen";
export default function SignupCompleteScreen({ route, navigation }) {
  return (
    <ImageBackground
      source={require("../images/multi1.jpg")}
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
      blurRadius={2}
    >
      <View style={{ marginTop: 25 }}>
        <View
          style={{
            backgroundColor: "lightgrey",
            borderRadius: 10,
            margin: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#0A0A0A",
            }}
          >
            Your account has been created. You are now able to sign in, but to
            use your account, you need to complete in your profile. Hit next,
            and we will walk you through the steps to continue setting up your
            account.
          </Text>
        </View>
        <TouchableOpacity
          style={{
            fontSize: 16,
            color: "white",
            backgroundColor: "coral",
            padding: 5,
            marginTop: 10,
            minWidth: 250,
            borderRadius: 20,
            margin: 10,
          }}
          onPress={() =>
            navigation.navigate("SignupStage2Screen", {
              Live_loc: route.params?.live_location,
            })
          }
        >
          <Text style={{ padding: 5, color: "black", textAlign: "center" }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
