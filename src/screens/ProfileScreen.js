import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Modal,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import Api from "../../service/Api";
// import { Surface, Shape } from "@react-native-community/art";
import ProgressCircle from "react-native-progress-circle";
import ProfileCardTopTab from "../navigations/ProfileCardTopTab";
import FullImage from "./FullImage";
import ImageView from "react-native-image-view";
import UserProfileDetailScreen from "./UserProfileDetailScreen";
import { ScrollView } from "react-native-gesture-handler";
import ComparisonScreen from "../screens/ComparisonScreen";
import SurveyScreen from "./SurveyScreen";
import { TabView } from "react-native-tab-view";
import EditProfileForm from "../screens/EditProfileForm";
import "react-native-gesture-handler";
import SearchHeader from "../components/SearchHeader";
function ProfileScreen({ navigation }) {
  const [imgcomp, setimgcomp] = useState(false);
  const [Imagevisible, setImagevisible] = useState();
  const [Update_tagline, setUpdate_tagline] = useState();
  const [Path, setPath] = useState({});
  const [userdata, setuserdata] = useState({});
  const [Dataloading, setDataloading] = useState(true);
  const [check, setcheck] = useState(false);
  const [Modalvisible, setModalvisible] = useState(false);
  const [ProfileModal, setProfileModal] = useState(false);

  useEffect(() => {
    // setDataloading(true);
    // Api.whoami()
    //   .then((data) => {
    //     console.log(data, "who am i data");
    //     setuserdata(data);
    //     setPath(data.user.user_id);
    //     setDataloading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Refreshed!");
      setDataloading(true);
      Api.whoami().then((data) => {
        console.log(data, "who am i data");
        setuserdata(data);
        setPath(data.user.user_id);

        setDataloading(false);
      });
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setDataloading(true);
    Api.whoami().then((data) => {
      console.log(data, "who am i data");
      setuserdata(data);
      setPath(data.user.user_id);

      setDataloading(false);
    });
  }, [check]);

  const UserProfileCardPicture = (user_id, quality = true) => {
    let extra = quality ? "" : "/1";
    return Api.uri(Api._base + "/media/default/" + user_id + extra);
  };
  const images = [
    {
      source: UserProfileCardPicture(Path),
      width: 806,
      height: 840,
    },
  ];

  const viewfullimage = () => {
    setImagevisible(true);
    setimgcomp(true);
  };

  const closehandle = () => {
    setImagevisible(false);
    setimgcomp(false);
  };
  const modal_submit = () => {
    console.log(Update_tagline, "Update_tagline");
    if (Update_tagline == "") {
      ToastAndroid.show("Please fill the Tagline", ToastAndroid.SHORT);
    } else {
      Api.updateTagLine(Update_tagline)
        .then((data) => {})
        .catch((error) => {});
      ToastAndroid.show("Tagline Updated Successfully", ToastAndroid.SHORT);
      setModalvisible(!Modalvisible);
      setcheck(!check);
    }
  };
  const modal_visibility = () => {
    setUpdate_tagline(userdata.user.meta.tagline);
    setModalvisible(!Modalvisible);
  };
  const profile_modal_visibility = () => {
    setProfileModal(!ProfileModal);
  };
  const modal_cancel = () => {
    setModalvisible(!Modalvisible);
  };

  return (
    <>
      {Dataloading == true || userdata == null ? (
        <ActivityIndicator
          color="red"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></ActivityIndicator>
      ) : (
        <>
          {imgcomp ? (
            <View>
              <ImageView
                style={{ width: 100, height: 100 }}
                images={images}
                imageIndex={0}
                isVisible={Imagevisible}
                onClose={() => closehandle()}
                animationType="slide"
                isTapZoomEnabled={true}
              />
            </View>
          ) : (
            <>
              <ScrollView>
                <SearchHeader
                  navigation={navigation}
                  header_text={"My Profile"}
                />
                <View style={{ marginLeft: 100, marginRight: 100 }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => viewfullimage()}
                  >
                    <ImageBackground
                      source={UserProfileCardPicture(userdata.user.user_id)}
                      style={{ width: 190, height: 190, marginTop: 30 }}
                    >
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          width: "100%",
                          height: 40,
                          alignItems: "center",
                          flexDirection: "column",
                          marginTop: 150,
                          padding: 10,
                        }}
                      >
                        <Text numberOfLines={1} style={{ color: "#fff" }}>
                          {userdata.user.meta.username}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "column",
                      marginLeft: 30,
                    }}
                  >
                    <TouchableOpacity
                      style={{ backgroundColor: "red", borderRadius: 5 }}
                    >
                      <Text
                        style={{
                          padding: 5,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Verify Identity
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "column",
                      marginLeft: 150,
                    }}
                  >
                    <ProgressCircle
                      percent={userdata.user.complete}
                      radius={18}
                      borderWidth={4}
                      color="#228b22"
                      shadowColor="#999"
                      bgColor="#fff"
                    >
                      <Text style={{ fontSize: 10 }}>
                        {userdata.user.complete}%
                      </Text>
                    </ProgressCircle>

                    <Text
                      style={{ color: "black" }}
                      onPress={() => profile_modal_visibility()}
                    >
                      {"     "}Profile {"\n"} Completed
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",

                    marginTop: 5,
                    backgroundColor: "red",
                    height: 40,
                  }}
                >
                  {userdata.user.meta.tagline == "" ? (
                    <Text style={{ color: "white" }}>
                      "I haven't wrote a tagline yet"
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        maxWidth: 300,
                        minWidth: 300,
                        marginLeft: 10,
                        marginRight: 25,
                      }}
                    >
                      "{userdata.user.meta.tagline}"
                    </Text>
                  )}

                  <Icon
                    name="edit"
                    type="MaterialIcons"
                    color="white"
                    size={25}
                    onPress={() => modal_visibility()}
                  />
                </View>
                <ProfileCardTopTab
                  user_data={userdata}
                  myprofile="myprofile"
                  NAVIGATION={navigation}
                />
              </ScrollView>
            </>
          )}
        </>
      )}
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
                  textAlign: "center",
                  color: "black",
                  marginTop: 15,
                  margin: 11,
                  fontSize: 18,
                }}
              >
                Tagline
              </Text>
              <TextInput
                placeholder=" Tagline"
                placeholderTextColor="grey"
                defaultValue={userdata.user.meta.tagline}
                onChangeText={(Update_tagline) =>
                  setUpdate_tagline(Update_tagline)
                }
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
              <View style={{ flexDirection: "row", margin: 10 }}>
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    marginRight: 10,
                    marginBottom: 10,
                    minWidth: 95,
                  }}
                  onPress={() => modal_cancel()}
                >
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    marginRight: 10,
                    marginBottom: 10,
                    minWidth: 95,
                  }}
                  onPress={() => modal_submit()}
                >
                  <Text
                    style={{
                      color: "green",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {ProfileModal && (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={ProfileModal}
        >
          <View style={{ height: 750, backgroundColor: "rgba(0,0,0,0.7)" }}>
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
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "red",
                  borderRadius: 10,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    padding: 10,
                    fontSize: 17,
                  }}
                >
                  Things to do to increase this...
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "purple",
                    paddingTop: 5,
                    paddingStart: 20,
                    minWidth: 230,
                  }}
                >
                  Upload Photo (+15%)
                </Text>
                {userdata.completeness.photo == 100 ? (
                  <Icon name="check" type="AntDesign" color="green" size={25} />
                ) : (
                  <Icon name="close" type="AntDesign" color="red" size={25} />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "purple",
                    paddingTop: 5,
                    paddingStart: 20,
                    minWidth: 230,
                  }}
                >
                  Upload Video (+15%)
                </Text>
                {userdata.completeness.video != 0 ? (
                  <Icon name="check" type="AntDesign" color="green" size={25} />
                ) : (
                  <Icon name="close" type="AntDesign" color="red" size={25} />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "purple",
                    paddingTop: 5,
                    paddingStart: 20,
                    minWidth: 230,
                  }}
                >
                  Set Your Location (+5%)
                </Text>
                {userdata.completeness.location == 100 ? (
                  <Icon name="check" type="AntDesign" color="green" size={25} />
                ) : (
                  <Icon name="close" type="AntDesign" color="red" size={25} />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "purple",
                    paddingTop: 5,
                    paddingStart: 20,
                    minWidth: 230,
                  }}
                >
                  Profile Information (+35%)
                </Text>
                {userdata.completeness.profile == 100 ? (
                  <Icon name="check" type="AntDesign" color="green" size={25} />
                ) : (
                  <Icon name="close" type="AntDesign" color="red" size={25} />
                )}
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "purple",
                    paddingTop: 5,
                    paddingStart: 20,
                    minWidth: 230,
                  }}
                >
                  Verify Identity (+10%)
                </Text>
                {userdata.completeness.verified != 0 ? (
                  <Icon name="check" type="AntDesign" color="green" size={25} />
                ) : (
                  <Icon name="close" type="AntDesign" color="red" size={25} />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "purple",
                    paddingTop: 5,
                    paddingStart: 20,
                    minWidth: 230,
                  }}
                >
                  Compatibility Test (+20%)
                </Text>
                {userdata.completeness.survey == 100 ? (
                  <Icon name="check" type="AntDesign" color="green" size={25} />
                ) : (
                  <Icon name="close" type="AntDesign" color="red" size={25} />
                )}
              </View>
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  marginRight: 18,
                  marginBottom: 10,
                }}
                onPress={() => profile_modal_visibility()}
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
export default ProfileScreen;
