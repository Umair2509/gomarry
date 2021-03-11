import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import RNFS from "react-native-fs";
import Api from "../../service/Api";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Base64 } from "js-base64";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";

export default function SignupStage3Screen({ navigation }) {
  const [state, setState] = useState({
    filePath: ["", "", "", ""],
    loading: false,
  });
  const { filePath, loading } = state;

  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  const avatar = require("../images/avatar.png");
  var offset = 0;
  let chunksize = 1024 * 1024 * 5;
  let index = 1;
  var upload_id = uuidv4();

  useEffect(() => {
    requestCameraPermission();
    requestExternalWritePermission();
    Api.whoami()
      .then((data) => {
        console.log(data, "Whoami");
        // console.log(data.user.images, "abababab");
        // if (data.user.images != null) {
        //   navigation.navigate("Dashboard");
        // }
      })
      .catch((err) => {});
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type, index) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          // alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        console.log(response, "responseee");
        filePath.splice(index, 1, response);

        updateField({ filePath: filePath });
        console.log(filePath, "file pathhhh");
        makeChunks(response);
      });
    }
  };

  const chooseFile = (type, index) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      console.log(response, "responseee");
      filePath.splice(index, 1, response);

      updateField({ filePath: filePath });
      console.log(filePath, "file pathhhh");
      makeChunks(response);
    });
  };

  const uploadphoto = (chunk, res) => {
    RNFetchBlob.fetch(
      "POST",
      "http://74.208.169.133/api/uploadPicture",

      {
        Host: Api._host,
        "Upload-Length": `${res.fileSize}`,
        "X-Unique-Upload-Id": upload_id,
        "Upload-Offset": `${offset}`,
        "X-Auth-Token": global.token,
        "Content-Transfer-Encoding": "base64",
        "Upload-Metadata": encodeMetadata({
          filename: res.fileName,
          filetype: res.type,
          default: index,
        }),
      },
      chunk
    )
      .then((resp) => {
        console.log(resp, "this is response");
      })
      .catch((err) => {});
  };

  const makeChunks = (res) => {
    RNFS.read(res.uri, chunksize, offset, "base64")
      .then((chunk) => {
        uploadphoto(chunk, res);
        console.log(chunk, "this is chunk");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  function encodeMetadata(metadata) {
    var encoded = [];

    for (var key in metadata) {
      encoded.push(key + " " + Base64.encode(metadata[key]));
    }
    return encoded.join(",");
  }
  const photoalert = (ind) => {
    Alert.alert(
      "Alert",
      "Please Select Image",
      [
        {
          text: "Cancel",
        },

        {
          text: "Take Photo",
          onPress: () => captureImage("photo", ind),
        },
        {
          text: "Choose from Library",
          onPress: () => chooseFile("photo", ind),
        },
      ],
      { cancelable: false }
    );
  };
  const CompleteSignup = () => {
    updateField({ loading: true });
    Api.whoami()
      .then((data) => {
        var img = data.user.images;
        if (img != null) {
          Api.completeSignupStage3()
            .then((data) => {
              console.log(data, "Complete Signup Stage 3 Response");

              navigation.navigate("Dashboard");
              updateField({ loading: false });
            })
            .catch((error) => {
              console.log(error);
              alert("Please Upload a Photo");
              updateField({ loading: false });
            });
        } else {
          updateField({ loading: false });
          alert("Please Upload a Photo");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ImageBackground
      source={require("../images/blue_heart.jpg")}
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#8CC1E1",
            borderRadius: 10,
            margin: 10,
            padding: 10,
            marginTop: 50,
          }}
        >
          <Text>
            NOTE: Adding atleast one photo is compulsary. Because adding photos
            increases your chance of finding someone by an additional 24%. We
            allow up to 8 photos so aim for a minimum of 4.
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableHighlight onPress={() => photoalert(0)}>
            {filePath[0] == "" ? (
              <Image style={styles.imageStyle} source={avatar}></Image>
            ) : (
              <Image
                style={styles.imageStyle}
                source={{ uri: filePath[0].uri }}
              />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={() => photoalert(1)}>
            {filePath[1] == "" ? (
              <Image style={styles.imageStyle} source={avatar}></Image>
            ) : (
              <Image
                style={styles.imageStyle}
                source={{ uri: filePath[1].uri }}
              />
            )}
          </TouchableHighlight>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableHighlight onPress={() => photoalert(2)}>
            {filePath[2] == "" ? (
              <Image style={styles.imageStyle} source={avatar}></Image>
            ) : (
              <Image
                style={styles.imageStyle}
                source={{ uri: filePath[2].uri }}
              />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={() => photoalert(3)}>
            {filePath[3] == "" ? (
              <Image style={styles.imageStyle} source={avatar}></Image>
            ) : (
              <Image
                style={styles.imageStyle}
                source={{ uri: filePath[3].uri }}
              />
            )}
          </TouchableHighlight>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            fontSize: 16,
            color: "white",
            backgroundColor: "#8CC1E1",
            padding: 5,
            marginTop: 10,
            minWidth: 250,
            borderRadius: 20,
            margin: 10,
          }}
          onPress={() => loading === false && CompleteSignup()}
        >
          {loading == true ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ padding: 5, color: "black", textAlign: "center" }}>
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },

  imageStyle: {
    width: 187,
    height: 200,
    margin: 5,
  },
});
