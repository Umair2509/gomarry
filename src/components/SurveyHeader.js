import React from "react";
import { View, Text } from "react-native";
import { Header, Icon } from "react-native-elements";

function SurveyHeader( props ) {
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
            onPress={() => props.navigation.openDrawer()}
          />
        }
        centerComponent={{
          text: "Compatibility",
          style: { color: "#fff", fontSize: 22, fontWeight: "bold" },
        }}
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              containerStyle={{ marginRight: 5 }}
              name="arrow-back"
              type="MaterialIcons"
              color="#fff"
              onPress={props.back}
            />
            <Text style={{ color: "white" }}>Back </Text>
            <Text style={{ color: "white" }}> Skip</Text>
            <Icon
              containerStyle={{ marginLeft: 5 }}
              name="arrow-forward"
              type="MaterialIcons"
              color="#fff"
              onPress={props.skip}
            />
          </View>
        }
      ></Header>
    </View>
  );
}
export default SurveyHeader;
