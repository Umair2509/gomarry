import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import Api from "../../service/Api";
import VerifyEmailScreen from "./VerifyEmailScreen";
import SignupStage1Screen from "./SignupStage1Screen";
import LaunchScreen from "../screens/LaunchScreen";
import { ImageBackground } from "react-native";
function Signup({ navigation }) {
  const [state, setState] = useState({
    chosenDate: `${new Date().getDate()}-${new Date().getMonth() + 1}-${
      new Date().getFullYear() - 18
    }`,
    loading: false,
    year: new Date().getFullYear() - 18,
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    email: null,
    c_email: null,
    password: null,
    discovery: "other",
  });

  const {
    chosenDate,
    loading,
    year,
    month,
    day,
    discovery,
    index,
    email,
    password,
    c_email,
  } = state;

  const firstHandlePressNext = () => {
    if (email == null || c_email == null || password == null) {
      ToastAndroid.show("Type email and password", ToastAndroid.SHORT);
      console.log("ToastAndroid");
    } else if (email != c_email) {
      ToastAndroid.show("Email not same", ToastAndroid.SHORT);
    } else {
      Api.register(
        isSelected,
        month,
        day,
        year,
        email,
        c_email,
        password,
        discovery
      )
        .then(async (data) => {
          updateField({ loading: false });
          console.log(data);
          ToastAndroid.show("Account Created Sucessfully", ToastAndroid.SHORT);
          navigation.navigate("SignupStage1Screen");
          // navigation.navigate("VerifyEmailScreen", {
          //   email,
          // });
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
  };

  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  const [isSelected, setSelection] = useState(1);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <ImageBackground
      source={require("../images/pink.jpg")}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "black" }}>I am</Text>
          <CheckBox
            title="Male"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#F1959B"
            uncheckedColor="#F1959B"
            checked={isSelected === 1}
            onPress={() => setSelection(1)}
            containerStyle={{
              borderRadius: 10,
              backgroundColor: " rgba(255, 255, 255, .0)",
              borderColor: "#F1959B",
            }}
          ></CheckBox>
          {/* <Icon
          name="male"
          type="foundation"
          color="lightgreen"
          onPress={() => showMode()}
        ></Icon> */}
          <CheckBox
            title="Female"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#F1959B"
            uncheckedColor="#F1959B"
            checked={isSelected === 2}
            onPress={() => setSelection(2)}
            containerStyle={{
              borderRadius: 10,
              backgroundColor: " rgba(255, 255, 255, .0)",
              borderColor: "#F1959B",
            }}
          ></CheckBox>
          {/* <Icon
          name="female"
          type="foundation"
          color="lightgreen"
          onPress={() => showMode()}
        ></Icon> */}
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={{ marginEnd: 15, color: "black" }}>
            What is your age?
          </Text>
          <Icon
            name="calendar"
            type="antdesign"
            color="#F1959B"
            onPress={() => showMode()}
          ></Icon>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date(year - 100, month, day)}
              maximumDate={new Date(year, month, day)}
            />
          )}
          <Text style={{ marginStart: 10, color: "black" }}>
            {date.toDateString()}
            {/* {year} */}
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" email@address.com"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={(email) => updateField({ email })}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" confirm email"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={(c_email) => updateField({ c_email })}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={(password) => updateField({ password })}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => loading === false && firstHandlePressNext()}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonTextStyle}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={{ marginLeft: 35 }}>Already have account?</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#F1959B",
              borderRadius: 10,
              marginLeft: 25,
            }}
            onPress={() => navigation.navigate("Signin")}
          >
            <Text style={styles.buttonTextStyle}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#F1959B",
    padding: 5,
    marginTop: 10,
    minWidth: 250,
    borderRadius: 10,
  },
  buttonTextStyle: {
    padding: 5,
    color: "black",
    textAlign: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: "#F1959B",
    borderWidth: 1,
    borderRadius: 10,
  },
});
