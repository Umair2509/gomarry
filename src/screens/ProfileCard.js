import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Modal,
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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import ComparisonScreen from "../screens/ComparisonScreen";
import SurveyScreen from "./SurveyScreen";
import ConversationScreen from "./ConversationScreen";
function ProfileCard({ route }) {
  var userdata = route.params?.DATA;
  var navigation = route.params?.NAVIGATION;
  // console.log(userdata.user_id, "userrr dataa");
  const [imgcomp, setimgcomp] = useState(false);
  const [Imagevisible, setImagevisible] = useState();
  const [Profiledata, setProfiledata] = useState({});
  const [whoamidata, setwhoamidata] = useState({});
  const [Modalvisible, setModalvisible] = useState(false);
  const [Report_modal, setReport_modal] = useState(false);
  const [Report_reason, setReport_reason] = useState();
  const [Dataloading, setDataloading] = useState(true);
  const [Fav, setFav] = useState(route.params?.INTEREST ? true : false);
  const [Block, setBlock] = useState(route.params?.BLOCK ? true : false);
  const [Invite, setInvite] = useState(false);
  const UserProfileCardPicture = (user_id, quality = true) => {
    let extra = quality ? "" : "/1";
    return Api.uri(Api._base + "/media/default/" + user_id + extra);
  };
  useEffect(() => {
    setDataloading(true);
    Api.whoami()
      .then((data) => {
        // console.log(data, "aaaaaaaaaaaaaaaa");
        setwhoamidata(data);
        if (data.user.data.favourited.indexOf(userdata.user_id) != -1) {
          setFav(true);
        } else if (data.user.data.blocked.indexOf(userdata.user_id) != -1) {
          setBlock(true);
        } else if (data.user.data.invited.indexOf(userdata.user_id) != -1) {
          setInvite(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    Api.profile(userdata.meta.username)
      .then((data) => {
        // console.log(data.user.user_id, "aaaaaaaaaaaaaaaa");
        setProfiledata(data);
        setDataloading(false);
      })
      .catch((err) => {});
  }, []);

  const images = [
    {
      source: UserProfileCardPicture(userdata.user_id),

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

  const youandher = () => {
    setModalvisible(!Modalvisible);
  };
  const surveyscreenhandler = () => {
    setModalvisible(!Modalvisible);
    navigation.navigate("SurveyScreen");
  };
  const comparisonscreenhandler = () => {
    setModalvisible(!Modalvisible);
    navigation.navigate("ComparisonScreen", { USER_ID: userdata.user_id });
  };
  const favourite_btn = (val) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to " + val + " favourite?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => add_fav(val) },
      ],
      { cancelable: false }
    );
  };

  const add_fav = (val) => {
    setFav(!Fav);
    Api.toggleFavourite(userdata.user_id)
      .then((data) => {
        // console.log(data, "data");
        ToastAndroid.show("Favourite " + val, ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error, "error");
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  const block_btn = (val) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to " + val + " user?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => add_block(val) },
      ],
      { cancelable: false }
    );
  };
  const add_block = (val) => {
    setBlock(!Block);
    Api.toggleBlocked(userdata.user_id)
      .then((data) => {
        // console.log(data, "data");
        ToastAndroid.show("User " + val + "ed", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error, "error");
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
  const invite_btn = (val) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to " + val + " user?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => add_invite(val) },
      ],
      { cancelable: false }
    );
  };
  const add_invite = (val) => {
    setInvite(!Invite);
    Api.toggleInvite(userdata.user_id)
      .then((data) => {
        // console.log(data, "data");
        ToastAndroid.show("User " + val + "d", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error, "error");
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
  const modal_toggle = () => {
    setReport_modal(!Report_modal);
  };
  const submit_report = () => {
    console.log(Report_reason, "Report_reason");
    console.log(Profiledata.user.user_id, "Profiledata.user.user_id");
    if (Report_reason == null) {
      ToastAndroid.show("Please write the reason", ToastAndroid.SHORT);
    } else {
      Api.reportUser(Profiledata.user.user_id, Report_reason)
        .then((data) => {
          ToastAndroid.show("Submitted Successfully", ToastAndroid.SHORT);
        })
        .catch((error) => {});
      setReport_modal(!Report_modal);
    }
  };
  return (
    <>
      {Dataloading == true || Profiledata == null ? (
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
                <View
                  style={{ marginTop: 25, marginLeft: 100, marginRight: 100 }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => viewfullimage()}
                  >
                    <ImageBackground
                      source={UserProfileCardPicture(userdata.user_id)}
                      style={{ width: 190, height: 190, borderRadius: 10 }}
                    >
                      <View
                        style={{
                          marginTop: 0,
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 146, 100, 0.6)",
                            borderRadius: 20,
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginVertical: 5,
                            marginLeft: 5,
                          }}
                        >
                          <Icon
                            name="heart"
                            type="antdesign"
                            color="#fff"
                            size={15}
                          ></Icon>
                          <Text style={{ paddingLeft: 5, color: "#fff" }}>
                            Test: {userdata.compatibility_percent}%, Match:{" "}
                            {userdata.compatibility_accuracy}%
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          width: "100%",
                          height: 40,
                          alignItems: "center",
                          flexDirection: "column",
                          marginTop: 120,
                          padding: 10,
                        }}
                      >
                        <Text numberOfLines={1} style={{ color: "#fff" }}>
                          {userdata.meta.username}, {userdata.meta.age}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <View
                    style={{ alignItems: "center", flexDirection: "column" }}
                  >
                    {userdata.meta.tagline == "" ? (
                      <Text style={{ color: "black" }}>
                        "I haven't wrote a tagline yet"
                      </Text>
                    ) : (
                      <Text style={{ color: "black" }}>
                        "{userdata.meta.tagline}"
                      </Text>
                    )}
                  </View>
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
                    <Icon
                      name="torsos-female-male"
                      type="foundation"
                      color="mediumpurple"
                      size={33}
                      onPress={() => youandher()}
                    />
                    <Text style={{ color: "black" }}>You & Her</Text>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "column",
                      marginLeft: 20,
                    }}
                  >
                    {userdata.meta.premium == 1 ? (
                      <Icon
                        name="checkcircle"
                        type="antdesign"
                        color="green"
                        size={33}
                      />
                    ) : (
                      <Icon
                        name="circle-with-cross"
                        type="entypo"
                        color="red"
                        size={33}
                      />
                    )}
                    {userdata.meta.premium == 1 ? (
                      <Text style={{ color: "black" }}>Premium</Text>
                    ) : (
                      <Text style={{ color: "black" }}>Not Premium</Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "column",
                      marginLeft: 20,
                    }}
                  >
                    {userdata.meta.verified == 1 ? (
                      <Icon
                        name="shield-check"
                        type="material-community"
                        color="green"
                        size={33}
                      />
                    ) : (
                      <Icon
                        name="shield-alert"
                        type="material-community"
                        color="red"
                        size={33}
                      />
                    )}
                    {userdata.meta.verified == 1 ? (
                      <Text style={{ color: "black" }}>Verified</Text>
                    ) : (
                      <Text style={{ color: "black" }}>Not Verified</Text>
                    )}
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "column",
                      marginLeft: 20,
                    }}
                  >
                    <ProgressCircle
                      percent={userdata.complete}
                      radius={18}
                      borderWidth={4}
                      color="#228b22"
                      shadowColor="#999"
                      bgColor="#fff"
                    >
                      <Text style={{ fontSize: 10 }}>{userdata.complete}%</Text>
                    </ProgressCircle>

                    <Text style={{ color: "black" }}>
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
                  {Invite ? (
                    <View style={{ marginLeft: 47 }}>
                      <Icon
                        name="eye"
                        type="material-community"
                        color="white"
                        size={30}
                        onPress={() => invite_btn("un-invite")}
                      />
                    </View>
                  ) : (
                    <View style={{ marginLeft: 47 }}>
                      <Icon
                        name="eye-outline"
                        type="material-community"
                        color="white"
                        size={30}
                        onPress={() => invite_btn("invite")}
                      />
                    </View>
                  )}

                  <View style={{ paddingLeft: 35, marginRight: 35 }}>
                    <Icon
                      name="message-text-outline"
                      type="material-community"
                      color="white"
                      size={30}
                      onPress={() =>
                        navigation.navigate("ConversationScreen", {
                          id: whoamidata.user.user_id,
                          name: userdata.meta.username,
                          userid: Profiledata.user.user_id,
                        })
                      }
                    />
                  </View>

                  {Fav ? (
                    <Icon
                      name="heart"
                      type="material-community"
                      color="white"
                      size={30}
                      onPress={() => favourite_btn("remove")}
                    />
                  ) : (
                    <Icon
                      name="heart-outline"
                      type="material-community"
                      color="white"
                      size={30}
                      onPress={() => favourite_btn("add")}
                    />
                  )}
                  {Block ? (
                    <View style={{ marginLeft: 35 }}>
                      <Icon
                        name="lock"
                        type="material-community"
                        color="white"
                        size={30}
                        onPress={() => block_btn("unblock")}
                      />
                    </View>
                  ) : (
                    <View style={{ marginLeft: 35 }}>
                      <Icon
                        name="lock-open-outline"
                        type="material-community"
                        color="white"
                        size={30}
                        onPress={() => block_btn("block")}
                      />
                    </View>
                  )}
                  <View style={{ marginLeft: 35 }}>
                    <Icon
                      name="message-alert-outline"
                      type="material-community"
                      color="white"
                      size={30}
                      onPress={() => modal_toggle()}
                    />
                  </View>
                </View>
                <ProfileCardTopTab user_data={Profiledata} />
              </ScrollView>

              {Modalvisible == true ? (
                <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={Modalvisible}
                >
                  <View
                    style={{ height: 750, backgroundColor: "rgba(0,0,0,0.7)" }}
                  >
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
                          // borderWidth: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "white",
                            padding: 10,
                            fontSize: 20,
                          }}
                        >
                          You & Her
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: "purple",
                            paddingTop: 5,
                            paddingStart: 5,
                          }}
                        >
                          You & Her Compatibility
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            paddingLeft: 10,
                          }}
                        >
                          {userdata.compatibility_percent}% Compatible
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            paddingLeft: 10,
                          }}
                        >
                          {userdata.compatibility_accuracy}% Accuracy
                        </Text>
                        <Text
                          style={{
                            color: "purple",
                            paddingTop: 5,
                            paddingStart: 5,
                          }}
                        >
                          Marriage Compatibility Test
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              paddingLeft: 10,
                            }}
                          >
                            You Completed {whoamidata.survey_completion}%{" "}
                          </Text>
                          <Text
                            style={{
                              color: "blue",
                              textDecorationLine: "underline",
                            }}
                            onPress={() => surveyscreenhandler()}
                          >
                            (Complete more)
                          </Text>
                        </View>

                        <Text
                          style={{
                            color: "black",
                            paddingLeft: 10,
                          }}
                        >
                          They Completed {Profiledata.survey_completion}%
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingTop: 5,
                            paddingStart: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "purple",
                            }}
                          >
                            See{" "}
                          </Text>
                          <Text
                            style={{
                              color: "blue",
                              textDecorationLine: "underline",
                            }}
                            onPress={() => comparisonscreenhandler()}
                          >
                            Comparison
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          alignItems: "flex-end",
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                        onPress={() => youandher()}
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
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
      {Report_modal && (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={Report_modal}
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
                  color: "purple",
                  marginTop: 15,
                  margin: 11,
                  marginBottom: 5,
                  fontSize: 15,
                }}
              >
                Why Are You Reporting This User?
              </Text>
              <TextInput
                placeholder=""
                placeholderTextColor="grey"
                multiline={true}
                textAlignVertical={"top"}
                onChangeText={(txt) => setReport_reason(txt)}
                counter={false}
                style={{
                  marginTop: 0,
                  margin: 10,
                  minWidth: 240,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 140,
                  textAlign: "auto",
                }}
              ></TextInput>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  marginTop: 5,
                  marginBottom: 2,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    marginRight: 10,
                    marginBottom: 10,
                    minWidth: 95,
                  }}
                  onPress={() => modal_toggle()}
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
                  onPress={() => submit_report()}
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
    </>
  );
}
export default ProfileCard;
