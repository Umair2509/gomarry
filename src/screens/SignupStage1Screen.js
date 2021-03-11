import React, { useState, useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  ImageBackground,
} from "react-native";
import Api from "../../service/Api";
// import { setProfileCompleted, suggestLocation } from "../../store/actions";
import SignupCompleteScreen from "./SignupCompleteScreen";

export default function SignupStage1Screen({ navigation }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
    username: "",
    tagline: "",
    longitude: 0,
    latitude: 0,
    index: Math.floor(Math.random() * 4),
    S1_location: "",
  });

  const {
    loading,
    username,
    tagline,
    longitude,
    latitude,
    index,
    S1_location,
  } = state;
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      callLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          callLocation();
        } else {
          updateField({ loading: false });
        }
      } catch (err) {
        updateField({ loading: false });
      }
    }
  };

  const callLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        updateField({
          loading: false,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        updateField({ loading: false });

        // renderToast(error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 3600000 }
    );
  };
  const nextStep = () => {
    if (username !== "" || tagline !== "") {
      updateField({ loading: true });

      Api.completeSignupStage1(username, tagline, latitude, longitude)
        .then((data) => {
          console.log(data, "signup stage 1 response");
          // console.log(data.location.string, "signup stage 1 Location");
          // dispatch(setProfileCompleted(data));
          // dispatch(suggestLocation(data.location));

          navigation.navigate("SignupCompleteScreen", {
            live_location: data.location.string,
          });
          ToastAndroid.show("Done", ToastAndroid.SHORT);
        })
        .catch((error) => {
          //   renderToast(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
          updateField({ loading: false });
        });
    } else {
      //   renderToast("Type username and tagline");
      ToastAndroid.show("Type username and tagline", ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      source={require("../images/multi1.jpg")}
      style={{ flex: 1 }}
      blurRadius={2}
    >
      <View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 17,
            }}
          >
            Now it's time to choose your username
          </Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            id={"username"}
            value={username}
            onChangeText={(username) => updateField({ username })}
            maxLength={20}
            counter={false}
            multiline={false}
            leftIcon="account"
            leftIconType="material-community"
            style={{
              margin: 10,
              minWidth: 250,
              borderColor: "coral",
              borderWidth: 3,
              borderRadius: 10,
            }}
          ></TextInput>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 17,
            }}
          >
            Add an attention grabbing tagline
          </Text>
          <TextInput
            placeholder="Tagline"
            placeholderTextColor="white"
            id={"tagline"}
            value={tagline}
            onChangeText={(tagline) => updateField({ tagline })}
            maxLength={50}
            counter={false}
            multiline={false}
            leftIcon="tag"
            leftIconType="material-community"
            style={{
              margin: 10,
              minWidth: 250,
              borderColor: "coral",
              borderWidth: 3,
              borderRadius: 10,
            }}
          ></TextInput>
          <TouchableOpacity
            style={{
              fontSize: 16,
              color: "white",
              backgroundColor: "coral",
              padding: 5,
              marginTop: 10,
              minWidth: 250,
              borderRadius: 10,
            }}
            onPress={() => nextStep()}
            loading={loading}
            disabled={loading}
          >
            <Text style={{ padding: 5, color: "black", textAlign: "center" }}>
              Continue to the next step
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
