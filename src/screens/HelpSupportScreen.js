import React, { useState } from "react";
import { View, Text, TextInput, ToastAndroid } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Api from "../../service/Api";
import SearchHeader from "../components/SearchHeader";
function HelpSupportScreen({ navigation }) {
  const [state, setState] = useState({
    loading: false,
    name: null,
    email: null,
    subject: null,
    message: null,
  });
  const { loading, name, email, subject, message } = state;

  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  const on_submit = () => {
    if (name == null || email == null || subject == null || message == null) {
      ToastAndroid.show("Please fill the fields", ToastAndroid.SHORT);
    } else {
      Api.createSupportTicket(name, email, subject, message)
        .then((data) => {
          ToastAndroid.show("Submitted Successfully", ToastAndroid.SHORT);
          console.log(data, "data");
        })
        .catch((error) => {
          ToastAndroid.show(error, ToastAndroid.SHORT);
          console.log(error, "error");
        });
    }
  };
  return (
    <View>
      <SearchHeader navigation={navigation} header_text={"Help & Support"} />
      <View
        style={{
          backgroundColor: "lightgrey",
          borderRadius: 10,
          margin: 10,
          padding: 10,
        }}
      >
        <TextInput
          placeholder=" Name"
          placeholderTextColor="grey"
          onChangeText={(name) => updateField({ name })}
          counter={false}
          multiline={false}
          style={{
            margin: 5,
            minWidth: 250,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 10,
          }}
        ></TextInput>
        <TextInput
          placeholder=" Email"
          placeholderTextColor="grey"
          onChangeText={(email) => updateField({ email })}
          counter={false}
          multiline={false}
          style={{
            margin: 5,
            minWidth: 250,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 10,
          }}
        ></TextInput>
        <TextInput
          placeholder=" Subject"
          placeholderTextColor="grey"
          onChangeText={(subject) => updateField({ subject })}
          counter={false}
          multiline={false}
          style={{
            margin: 5,
            minWidth: 250,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 10,
          }}
        ></TextInput>
        <TextInput
          placeholder=" Message"
          placeholderTextColor="grey"
          onChangeText={(message) => updateField({ message })}
          counter={false}
          multiline={true}
          textAlignVertical={"top"}
          style={{
            margin: 5,
            minWidth: 250,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 10,
            height: 150,
            textAlign: "auto",
          }}
        ></TextInput>
        <TouchableOpacity
          style={{
            backgroundColor: "#31a300",
            padding: 10,
            margin: 5,
            borderRadius: 10,
          }}
          onPress={() => on_submit()}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default HelpSupportScreen;
