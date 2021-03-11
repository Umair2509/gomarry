import React from "react";
import { View } from "react-native";
import { Header, Icon } from "react-native-elements";
function SearchHeader(props) {
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
          text: props.header_text,
          style: { color: "#fff", fontSize: 22, fontWeight: "bold" },
        }}
      ></Header>
    </View>
  );
}
export default SearchHeader;
