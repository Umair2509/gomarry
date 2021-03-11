import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import Api from "../../service/Api";
import Dashboard from "../screens/Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupStage1Screen from "./SignupStage1Screen";
import LaunchScreen from "../screens/LaunchScreen";
// import { ImageBackground } from "react-native";
function Signin({ navigation }) {
  const [Dataloading, setDataloading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem("mygomarry_token").then((res) => {
      if (res != null) {
        navigation.navigate("LaunchScreen");
      }
      setDataloading(false);
    });
  });
  const [state, setState] = useState({
    loading: false,
    email: null,
    password: null,
  });
  const { loading, email, password } = state;

  const signinfunc = () => {
    updateField({ loading: true });

    Api.login(email, password)
      .then(async (data) => {
        updateField({ loading: false });
        // console.log(data);
        ToastAndroid.show("Login Sucessfully", ToastAndroid.SHORT);
        navigation.navigate(LaunchScreen);
        updateField({ loading: false });
      })
      .catch((error) => {
        // console.log(error);
        updateField({ loading: false });
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };

  return (
    <>
      <ImageBackground
        source={require("../images/pink.jpg")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {Dataloading ? (
          <ActivityIndicator
            color="red"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        ) : (
          <View>
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
                placeholder=" Password"
                secureTextEntry={true}
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={(password) => updateField({ password })}
              />
              <Text style={{ paddingLeft: 120 }}>Forgot Password?</Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => loading === false && signinfunc()}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonTextStyle}>SignIn</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.label}>Don't have an account?</Text>
              <TouchableOpacity
                style={{ backgroundColor: "#F1959B", borderRadius: 10 }}
                onPress={() => navigation.navigate("Signup")}
              >
                <Text style={styles.buttonTextStyle}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </>
  );
}
export default Signin;

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
    margin: 15,
    height: 40,
    borderColor: "#F1959B",
    borderWidth: 1,
    borderRadius: 10,
  },
});
