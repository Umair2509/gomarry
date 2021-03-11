import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Modal,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../service/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
function AccountScreen({ navigation }) {
  const [state, setState] = useState({
    c_password: false,
    n_password: null,
    r_password: null,
    c_email: null,
    n_email: null,
    r_email: null,
    Modalvisible: false,
    delete_pass: null,
  });
  const {
    c_password,
    n_password,
    r_password,
    c_email,
    n_email,
    r_email,
    Modalvisible,
    delete_pass,
  } = state;

  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  const modal_submit = () => {
    Api.deleteAccount(delete_pass)
      .then((data) => {
        console.log(data, "data");
        ToastAndroid.show("Account deleted Sucessfully", ToastAndroid.SHORT);
        Api.logout(global.deviceid, global.devicetoken);
        AsyncStorage.removeItem("mygomarry_token");
        navigation.navigate("Signin");
      })
      .catch((error) => {
        console.log(error, "error");
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
    updateField({ Modalvisible: !Modalvisible });
  };
  const on_submit_password = () => {
    if (c_password == null || n_password == null || r_password == null) {
      ToastAndroid.show("Please fill password fields", ToastAndroid.SHORT);
    } else if (n_password != r_password) {
      ToastAndroid.show("Password is not same", ToastAndroid.SHORT);
    } else {
      Api.changePassword(c_password, n_password, r_password)
        .then((data) => {
          console.log(data, "data");
          ToastAndroid.show(
            "Password changed successfully",
            ToastAndroid.SHORT
          );
        })
        .catch((error) => {
          console.log(error, "error");
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
  };
  const on_submit_email = () => {
    if (c_email == null || n_email == null || r_email == null) {
      ToastAndroid.show("Please fill email fields", ToastAndroid.SHORT);
    } else if (n_email != r_email) {
      ToastAndroid.show("email is not same", ToastAndroid.SHORT);
    } else {
      Api.changeEmail(c_email, n_email, r_email)
        .then((data) => {
          console.log(data, "data");
        })
        .catch((error) => {
          console.log(error, "error");
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
  };
  const on_submit_account = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to Delete Account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => updateField({ Modalvisible: true }) },
      ],
      { cancelable: false }
    );
  };
  return (
    <>
      <ScrollView>
        <View>
          <View
            style={{
              backgroundColor: "lightgrey",
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          >
            <TextInput
              placeholder=" Current Password"
              placeholderTextColor="grey"
              onChangeText={(c_password) => updateField({ c_password })}
              counter={false}
              multiline={false}
              secureTextEntry={true}
              style={{
                margin: 5,
                minWidth: 250,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
              }}
            ></TextInput>
            <TextInput
              placeholder=" New Password"
              placeholderTextColor="grey"
              onChangeText={(n_password) => updateField({ n_password })}
              counter={false}
              multiline={false}
              secureTextEntry={true}
              style={{
                margin: 5,
                minWidth: 250,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
              }}
            ></TextInput>
            <TextInput
              placeholder=" Repeat Password"
              placeholderTextColor="grey"
              onChangeText={(r_password) => updateField({ r_password })}
              counter={false}
              multiline={false}
              secureTextEntry={true}
              style={{
                margin: 5,
                minWidth: 250,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
              }}
            ></TextInput>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                margin: 5,
                borderRadius: 10,
              }}
              onPress={() => on_submit_password()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "lightgrey",
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          >
            <TextInput
              placeholder=" Current Email"
              placeholderTextColor="grey"
              onChangeText={(c_email) => updateField({ c_email })}
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
              placeholder=" New Email"
              placeholderTextColor="grey"
              onChangeText={(n_email) => updateField({ n_email })}
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
              placeholder=" Repeat Email"
              placeholderTextColor="grey"
              onChangeText={(r_email) => updateField({ r_email })}
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
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                margin: 5,
                borderRadius: 10,
              }}
              onPress={() => on_submit_email()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Change Email Address
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "lightgrey",
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "red" }}>
              Once you delete your account you will be logged out
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                margin: 5,
                borderRadius: 10,
              }}
              onPress={() => on_submit_account()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {Modalvisible && (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={Modalvisible}
        >
          <View style={{ height: 1050, backgroundColor: "rgba(0,0,0,0.7)" }}>
            <View
              style={{
                marginTop: 200,
                marginLeft: 70,
                backgroundColor: "white",
                alignItems: "stretch",
                width: 270,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  marginTop: 20,
                  margin: 11,
                  fontSize: 18,
                }}
              >
                Please enter your password
              </Text>
              <TextInput
                placeholder=" Password"
                placeholderTextColor="grey"
                onChangeText={(delete_pass) => updateField({ delete_pass })}
                counter={false}
                multiline={false}
                style={{
                  marginTop: 0,
                  margin: 10,
                  minWidth: 250,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              ></TextInput>

              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  marginRight: 10,
                  marginBottom: 10,
                }}
                onPress={() => modal_submit()}
              >
                <Text
                  style={{
                    color: "green",
                  }}
                >
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
export default AccountScreen;
