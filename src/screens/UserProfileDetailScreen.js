import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Api from "../../service/Api";
import { Icon } from "react-native-elements";
import EditProfileForm from "../screens/EditProfileForm";

function UserProfileDetailScreen(props) {
  const [loading, setloading] = useState(true);
  const [Profiledata, setProfiledata] = useState({});

  useEffect(() => {
    setloading(true);
    setProfiledata(props.profiledetail);
    if (Profiledata == undefined) {
      setloading(true);
    } else {
      setloading(false);
    }
  }, []);
  return (
    <>
      {loading == true || Profiledata == null ? (
        <ActivityIndicator
          color="red"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <View>
          {props.myprofile == "myprofile" ? (
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                backgroundColor: "lightgrey",
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flex: 0.3,
                  backgroundColor: "lightgrey",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  alignItems: "center",
                  paddingTop: 5,
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "purple",
                    marginBottom: 10,
                    fontSize: 18,
                    maxWidth: 100,
                    minWidth: 100,
                    marginRight: 220,
                  }}
                >
                  Location
                </Text>
                {props.myprofile == "myprofile" ? (
                  <Icon
                    name="edit"
                    type="MaterialIcons"
                    color="purple"
                    size={25}
                    onPress={() =>
                      props.navigation.navigate("EditProfileForm", {
                        WHO_AM_I_DATA: Profiledata,
                        SECTION: "location",
                      })
                    }
                  />
                ) : (
                  <></>
                )}
              </View>

              <View style={{ flexDirection: "row", marginRight: 100 }}>
                <Text style={{ color: "black", marginLeft: 5 }}>
                  {Profiledata.user.meta.location}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 0.3,
                backgroundColor: "lightgrey",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: "center",
                paddingTop: 5,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "purple",
                  marginBottom: 10,
                  fontSize: 18,
                  maxWidth: 100,
                  minWidth: 100,
                  marginRight: 220,
                }}
              >
                Basic
              </Text>
              {props.myprofile == "myprofile" ? (
                <Icon
                  name="edit"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  onPress={() =>
                    props.navigation.navigate("EditProfileForm", {
                      WHO_AM_I_DATA: Profiledata,
                      SECTION: "basic",
                    })
                  }
                />
              ) : (
                <></>
              )}
            </View>

            <View style={{ flexDirection: "row", marginRight: 100 }}>
              <View style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text>Age:</Text>
                <Text>Ethnic Origin:</Text>
                <Text>Nationality:</Text>
                <Text>Language:</Text>
                <Text>Second Language:</Text>
                <Text>Location:</Text>
              </View>
              <View style={{ flexDirection: "column", marginLeft: 30 }}>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.basic.age}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.basic.ethnic_origin}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.basic.nationality}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.basic.language}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.basic.second_language}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.basic.location}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 0.3,
                backgroundColor: "lightgrey",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: "center",
                paddingTop: 5,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              {/* <Text style={{color:"purple"}}>{props.username}</Text> */}
              <Text
                style={{
                  color: "purple",
                  marginBottom: 10,
                  fontSize: 18,
                  maxWidth: 100,
                  minWidth: 100,
                  marginRight: 220,
                }}
              >
                Academia
              </Text>
              {props.myprofile == "myprofile" ? (
                <Icon
                  name="edit"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  onPress={() =>
                    props.navigation.navigate("EditProfileForm", {
                      WHO_AM_I_DATA: Profiledata,
                      SECTION: "academia",
                    })
                  }
                />
              ) : (
                <></>
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text>Education:</Text>
                <Text>Profession:</Text>
                <Text>Ambition:</Text>
              </View>
              <View style={{ flexDirection: "column", marginLeft: 70 }}>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.academia.education}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.academia.profession}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.academia.ambition}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 0.3,
                backgroundColor: "lightgrey",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: "center",
                paddingTop: 5,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              {/* <Text style={{color:"purple"}}>{props.username}</Text> */}
              <Text
                style={{
                  color: "purple",
                  marginBottom: 10,
                  fontSize: 18,
                  maxWidth: 100,
                  minWidth: 100,
                  marginRight: 220,
                }}
              >
                Apperance
              </Text>
              {props.myprofile == "myprofile" ? (
                <Icon
                  name="edit"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  onPress={() =>
                    props.navigation.navigate("EditProfileForm", {
                      WHO_AM_I_DATA: Profiledata,
                      SECTION: "apperance",
                    })
                  }
                />
              ) : (
                <></>
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text>Eye Colour:</Text>
                <Text>Hair Colour:</Text>
                <Text>Body Type:</Text>
                <Text>Height:</Text>
              </View>
              <View style={{ flexDirection: "column", marginLeft: 70 }}>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.appearance.eye_colour}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.appearance.hair_colour}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.appearance.body_type}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.appearance.height}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 0.3,
                backgroundColor: "lightgrey",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: "center",
                paddingTop: 5,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              {/* <Text style={{color:"purple"}}>{props.username}</Text> */}
              <Text
                style={{
                  color: "purple",
                  marginBottom: 10,
                  fontSize: 18,
                  maxWidth: 100,
                  minWidth: 100,
                  marginRight: 220,
                }}
              >
                Lifestyle
              </Text>
              {props.myprofile == "myprofile" ? (
                <Icon
                  name="edit"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  onPress={() =>
                    props.navigation.navigate("EditProfileForm", {
                      WHO_AM_I_DATA: Profiledata,
                      SECTION: "lifestyle",
                    })
                  }
                />
              ) : (
                <></>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text>Personality:</Text>
                <Text>Personal Wealth:</Text>
                <Text>Marital Status:</Text>
                <Text>Religious Status:</Text>
                <Text>Children:</Text>
                <Text>Siblings:</Text>
                <Text>Living Status:</Text>
                <Text>Move:</Text>
                <Text>Diet:</Text>
                <Text>Smoking:</Text>
              </View>
              <View style={{ flexDirection: "column", marginLeft: 35 }}>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.personality}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.personal_wealth}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.marital_status}
                </Text>

                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.religious_status}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.children}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.siblings}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.living_status}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.move}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.diet}
                </Text>
                <Text style={{ color: "black" }}>
                  {Profiledata.user.data.profile.lifestyle.smoking}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 0.3,
                backgroundColor: "lightgrey",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: "center",
                paddingTop: 5,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              {/* <Text style={{color:"purple"}}>{props.username}</Text> */}
              <Text
                style={{
                  color: "purple",
                  marginBottom: 10,
                  fontSize: 18,
                  maxWidth: 100,
                  minWidth: 100,
                  marginRight: 220,
                }}
              >
                Personal
              </Text>
              {props.myprofile == "myprofile" ? (
                <Icon
                  name="edit"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  onPress={() =>
                    props.navigation.navigate("EditProfileForm", {
                      WHO_AM_I_DATA: Profiledata,
                      SECTION: "personal",
                    })
                  }
                />
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 5,
                alignItems: "flex-start",
              }}
            >
              <Text style={{ textDecorationLine: "underline" }}>About:</Text>
              <Text style={{ color: "black" }}>
                {Profiledata.user.data.profile.personal.about}
              </Text>
              <Text style={{ textDecorationLine: "underline" }}>Work:</Text>
              <Text style={{ color: "black" }}>
                {Profiledata.user.data.profile.personal.work}
              </Text>
              <Text style={{ textDecorationLine: "underline" }}>Seeking:</Text>
              <Text style={{ color: "black" }}>
                {Profiledata.user.data.profile.personal.seeking}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
export default UserProfileDetailScreen;
