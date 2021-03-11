import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Icon, Header } from "react-native-elements";
import Api from "../../service/Api";
import Signin from "./SigninScreen";

export default function VerifyEmailScreen({ route, navigation }) {
  const [state, setState] = useState({
    loading: false,
    verifing: false,
    btnText: "Resend",
    email: route.params?.email,
    timer: 30,
    code: "",
  });
  const { loading, btnText, email, verifing, code, timer } = state;
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  useEffect(() => {
    if (!timer) {
      updateField({ btnText: "Resent", timer: 0 });
      clearInterval(intervalId);
      return;
    }

    const intervalId = setInterval(() => {
      updateField({ timer: timer - 1 });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);
  const onFinishCheckingCode = () => {
    updateField({ verifing: true });
    Api.verifyAccount(code)
      .then((res) => console.log("verified"))
      .catch((error) => {
        updateField({ verifing: false });
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
  const resendCode = () => {
    updateField({ loading: true });
    Api.resendVerificationCode()
      .then((res) => {
        updateField({
          loading: false,
          btnText: "Sent",
          timer: 30,
        });
      })
      .catch((error) => {
        updateField({ loading: false });

        // renderToast(error);
      });
  };

  // const { email } = route.params;
  const Logoutfunc = () => {
    Api.logout(global.deviceid, global.devicetoken);
    AsyncStorage.removeItem("mygomarry_token");
    navigation.navigate("Signin");
  };
  return (
    <View>
      <Header
        placement="left"
        containerStyle={{
          backgroundColor: "red",
          justifyContent: "space-around",
        }}
        centerComponent={{
          text: "Email Verify",
          style: { color: "#fff", fontSize: 22, fontWeight: "bold" },
        }}
        rightComponent={
          <Icon
            name="log-out"
            type="entypo"
            color="#fff"
            onPress={() => Logoutfunc()}
          />
        }
      ></Header>
      <Text
        style={{
          textAlign: "center",
          color: "#0A0A0A",
          fontSize: 22,
          fontWeight: "bold",
          paddingTop: 15,
        }}
      >
        Verification
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#0A0A0A",
        }}
      >
        Please enter the verification code
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#0A0A0A",
        }}
      >
        we sent you at {email}
      </Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="   6-digit verification code"
        keyboardType="decimal-pad"
        maxLength={6}
        counter={false}
        multiline={false}
        onChangeText={(text) => updateField({ code: text })}
        placeholderTextColor="grey"
        autoCapitalize="none"
      ></TextInput>
      <TouchableOpacity
        style={{ backgroundColor: "lightgreen", borderRadius: 10 }}
        onPress={() => onFinishCheckingCode()}
      >
        <Text style={styles.buttonTextStyle}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "lightgreen", borderRadius: 10 }}
        title={btnText === "Sent" ? timer.toString() : btnText}
        onPress={() => resendCode()}
        loading={loading}
        disabled={loading || btnText === "Sent"}
      >
        <Text style={styles.buttonTextStyle}>Resend</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "lightgreen",
    padding: 5,
    marginTop: 10,
    minWidth: 250,
    borderRadius: 20,
  },
  buttonTextStyle: {
    padding: 5,
    color: "black",
    textAlign: "center",
  },
});
