import React from "react";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { View, Image, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Api from "../../service/Api";
import ProfileCard from "../screens/ProfileCard";

function UserCard(props) {
  const avatar = require("../images/avatar.png");
  const UserProfilePicture = (user_id, quality = true) => {
    let extra = quality ? "" : "/1";
    return Api.uri(Api._base + "/media/default/" + user_id + extra);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("ProfileCard", {
            DATA: props.data,
            NAVIGATION: props.navigation,
            INTEREST: props.interest,
            BLOCK: props.block,
          })
        }
      >
        <ImageBackground
          source={UserProfilePicture(props.data.user_id)}
          style={{ width: 190, height: 240, marginTop: 0 }}
        >
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: 20,
                paddingLeft: 5,
                paddingRight: 5,
                marginVertical: 5,
                marginLeft: 5,
              }}
            >
              <Icon
                name="location-on"
                type="MaterialIcons"
                color="#fff"
                size={15}
              ></Icon>
              <Text style={{ paddingLeft: 5, color: "#fff" }}>
                {props.data.distance} Km
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: 20,
                paddingLeft: 5,
                paddingRight: 5,
                marginVertical: 5,
                marginLeft: 5,
              }}
            >
              <Icon
                name="camera-alt"
                type="MaterialIcons"
                color="#fff"
                size={15}
              ></Icon>
              <Text style={{ paddingLeft: 5, color: "#fff" }}>
                {props.data.images}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: 20,
                paddingLeft: 5,
                paddingRight: 5,
                marginVertical: 5,
                marginLeft: 5,
              }}
            >
              <Icon
                name="videocam"
                type="MaterialIcons"
                color="#fff"
                size={15}
              ></Icon>
              <Text style={{ paddingLeft: 5, color: "#fff" }}>
                {props.data.videos}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 120,
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0, 146, 100, 0.6)",
                borderRadius: 20,
                paddingLeft: 5,
                paddingRight: 5,
                marginVertical: 5,
                marginLeft: 5,
              }}
            >
              <Icon name="heart" type="antdesign" color="#fff" size={15}></Icon>
              <Text style={{ paddingLeft: 5, color: "#fff" }}>
                Test: {props.data.compatibility_percent}%, Match:{" "}
                {props.data.compatibility_accuracy}%
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
              width: "100%",
              height: 60,
              padding: 5,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "#fff" }}>{props.data.meta.username}</Text>
            <Text numberOfLines={1} style={{ color: "#fff" }}>
              Age: {props.data.meta.age},{" "}
              {props.data.meta.location.split(",")[0]}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
export default UserCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  HeaderTextStyle: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical: 5,
    // width: 250,
  },
  imageStyle: {
    width: 197,
    height: 200,
    margin: 5,
  },
});
