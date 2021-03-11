import React, { useState } from "react";
import { Modal } from "react-native";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../service/Api";
function EditProfileForm({ route, navigation }) {
  let obj = route.params?.WHO_AM_I_DATA.attributes;
  let user = route.params?.WHO_AM_I_DATA.user.data.profile;
  // console.log(user, "useruseruser");
  // console.log(obj, "objjjjjjjjjjj");
  // console.log(navigation, "navigation");
  const [state, setState] = useState({
    search_location,
    searching: false,
    location_suggestions: [],
    Modalvisible: false,
    i: 0,

    basic: {
      ethnic_origin: {
        label: user.basic.ethnic_origin,
        key: user.basic._ethnic_origin,
      },
      nationality: {
        label: user.basic.nationality,
        key: user.basic._nationality,
      },
      language: {
        label: user.basic.language,
        key: user.basic._language,
      },
      second_language: {
        label: user.basic.second_language,
        key: user.basic._second_language,
      },
    },

    academia: {
      education: {
        label: user.academia.education,
        key: user.academia._education,
      },
      profession: {
        label: user.academia.profession,
        key: user.academia._profession,
      },
      ambition: {
        label: user.academia.ambition,
        key: user.academia._ambition,
      },
    },

    apperance: {
      eye_colour: {
        label: user.appearance.eye_colour,
        key: user.appearance._eye_colour,
      },
      hair_colour: {
        label: user.appearance.hair_colour,
        key: user.appearance._hair_colour,
      },
      body_type: {
        label: user.appearance.body_type,
        key: user.appearance._body_type,
      },
      height: {
        label: user.appearance.height,
        key: user.appearance._height,
      },
    },

    lifestyle: {
      personality: {
        label: user.lifestyle.personality,
        key: user.lifestyle._personality,
      },
      personal_wealth: {
        label: user.lifestyle.personal_wealth,
        key: user.lifestyle._personal_wealth,
      },
      marital_status: {
        label: user.lifestyle.marital_status,
        key: user.lifestyle._marital_status,
      },
      religious_status: {
        label: user.lifestyle.religious_status,
        key: user.lifestyle._religious_status,
      },
      children: {
        label: user.lifestyle.children,
        key: user.lifestyle._children,
      },
      siblings: {
        label: user.lifestyle.siblings,
        key: user.lifestyle._siblings,
      },
      living_status: {
        label: user.lifestyle.living_status,
        key: user.lifestyle._living_status,
      },
      move: { label: user.lifestyle.move, key: user.lifestyle._move },
      diet: { label: user.lifestyle.diet, key: user.lifestyle._diet },
      smoking: { label: user.lifestyle.smoking, key: user.lifestyle._smoking },
    },
    personal: {
      about: {
        label: user.personal.about,
        key: user.personal._about,
      },
      work: {
        label: user.personal.work,
        key: user.personal._work,
      },
      seeking: {
        label: user.personal.seeking,
        key: user.personal._seeking,
      },
    },
    about_input: user.personal._about,
    work_input: user.personal._work,
    seeking_input: user.personal._seeking,
  });
  const {
    search_location,
    searching,
    location_suggestions,
    Modalvisible,
    i,
    basic,
    academia,
    apperance,
    lifestyle,
    personal,
    about_input,
    work_input,
    seeking_input,
  } = state;
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };

  delete obj.dob;
  delete obj.gender;
  var testarray = [];
  for (var a in obj) {
    if (obj.hasOwnProperty(a)) {
      if (obj[a].profile.inputType == "select") {
        var options = obj[a].options;
        var optionArry = [];
        for (var v in options) {
          var option = options[v];
          if (typeof option === "object") {
            for (var sv in option) {
              if (!option.hasOwnProperty(sv)) continue;
              var suboption = option[sv];
              optionArry.push({
                key: sv,
                label: suboption,
                value: sv,
                vvv: obj[a].key,
              });
            }
          } else {
            optionArry.push({
              key: v,
              label: option,
              value: v,
              vvv: obj[a].key,
            });
          }
        }
        testarray.push({
          key: a,
          section: obj[a].section,
          options: optionArry,
          placeholder: obj[a].placeholder,
          input: obj[a].profile.inputType,
        });
      }
      if (obj[a].profile.inputType == "textarea") {
        testarray.push({
          key: a,
          section: obj[a].section,
          title: obj[a].title,
          input: obj[a].profile.inputType,
        });
      }
    }
  }
  // console.log(testarray, "testarray");

  const searchLocation = (search_location) => {
    updateField({ search_location, searching: true });
    Api.locationSearch(search_location)
      .then((data) => {
        updateField({
          location_suggestions: data.suggestions,
          searching: false,
        });
      })
      .catch((error) => {
        updateField({ searching: false });
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
  const renderLocation = ({ item }) => (
    <ListItem
      bottomDivider
      style={{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "grey",
        color: "black",
        backgroundColor: "lightgrey",
        padding: 3,
        textAlign: "left",
        margin: 5,
      }}
      onPress={() => selectLocation(item.id, item.string)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.string}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  const selectLocation = (id, string) => {
    Api.updateProfile("location", { location: id })
      .then((res) => {})
      .catch((error) => {});
    navigation.goBack();
  };

  const modalvisibility = () => {
    updateField({ Modalvisible: !Modalvisible });
  };
  const textinput_onpress = (val) => {
    updateField({ i: val });
    modalvisibility();
  };
  const list_onpress = (key, label, vv) => {
    updateField({ basic: { ...basic, [vv]: { label: label, key: key } } });
    updateField({
      academia: { ...academia, [vv]: { label: label, key: key } },
    });
    updateField({
      apperance: { ...apperance, [vv]: { label: label, key: key } },
    });
    updateField({
      lifestyle: { ...lifestyle, [vv]: { label: label, key: key } },
    });
    modalvisibility();
  };

  const save_btn_onpress = (section) => {
    if (section == basic) {
      Api.updateProfile("basic", {
        ethnic_origin: basic.ethnic_origin.key,
        nationality: basic.nationality.key,
        language: basic.language.key,
        second_language: basic.second_language.key,
      })
        .then((res) => {})
        .catch((error) => {});
      navigation.goBack();
    }
    if (section == academia) {
      Api.updateProfile("academia", {
        education: academia.education.key,
        profession: academia.profession.key,
        ambition: academia.ambition.key,
      })
        .then((res) => {})
        .catch((error) => {});
      navigation.goBack();
    }
    if (section == apperance) {
      Api.updateProfile("appearance", {
        eye_colour: apperance.eye_colour.key,
        hair_colour: apperance.hair_colour.key,
        body_type: apperance.body_type.key,
        height: apperance.height.key,
      })
        .then((res) => {})
        .catch((error) => {});
      navigation.goBack();
    }
    if (section == lifestyle) {
      Api.updateProfile("lifestyle", {
        personality: lifestyle.personality.key,
        personal_wealth: lifestyle.personal_wealth.key,
        marital_status: lifestyle.marital_status.key,
        religious_status: lifestyle.religious_status.key,
        children: lifestyle.children.key,
        siblings: lifestyle.siblings.key,
        living_status: lifestyle.living_status.key,
        move: lifestyle.move.key,
        diet: lifestyle.diet.key,
        smoking: lifestyle.smoking.key,
      })
        .then((res) => {})
        .catch((error) => {});
      navigation.goBack();
    }
  };
  const personal_submit = () => {
    if (about_input == "" || work_input == "" || seeking_input == "") {
      ToastAndroid.show("Please fill the fields", ToastAndroid.SHORT);
    } else {
      Api.updateProfile("personal", {
        about: about_input,
        work: work_input,
        seeking: seeking_input,
      })
        .then((data) => {
          console.log("data", data);
        })
        .catch((error) => {
          console.log("error", error);
        });
      navigation.goBack();
    }
  };
  return (
    <>
      {route.params?.SECTION == "location" && (
        <View style={{ marginTop: 25 }}>
          <FlatList
            ListHeaderComponent={
              <SearchBar
                showLoading={searching}
                platform={Platform.OS}
                round={true}
                lightTheme={true}
                placeholder="Your City"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={searchLocation}
                value={search_location}
              />
            }
            data={location_suggestions}
            renderItem={renderLocation}
            keyExtractor={(item) => item.id}
          ></FlatList>
          <Text style={{ paddingLeft: 10, paddingTop: 10, color: "black" }}>
            {route.params?.WHO_AM_I_DATA.user.meta.location}
          </Text>
        </View>
      )}
      {route.params?.SECTION == "basic" && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              color: "purple",
            }}
          >
            Basic
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Ethnic Origin</Text>

          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(0)}
          >
            {/* Ethnic Origin */}
            {basic.ethnic_origin.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Nationality</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(1)}
          >
            {/* Nationality */}
            {basic.nationality.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Language</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(2)}
          >
            {/* Language */}
            {basic.language.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>
            Second Language
          </Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(3)}
          >
            {/* Second Language */}
            {basic.second_language.label}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 425 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => save_btn_onpress(basic)}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {route.params?.SECTION == "academia" && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              color: "purple",
            }}
          >
            Academia
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Education</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(14)}
          >
            {academia.education.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Profession</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(15)}
          >
            {academia.profession.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Ambition</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(16)}
          >
            {academia.ambition.label}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 482 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => save_btn_onpress(academia)}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {route.params?.SECTION == "apperance" && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              color: "purple",
            }}
          >
            Apperance
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Eye Colour</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(17)}
          >
            {apperance.eye_colour.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Hair Colour</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(18)}
          >
            {apperance.hair_colour.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Body Type</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(19)}
          >
            {apperance.body_type.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Height</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(20)}
          >
            {apperance.height.label}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 425 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => save_btn_onpress(apperance)}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {route.params?.SECTION == "lifestyle" && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              color: "purple",
            }}
          >
            Lifestyle
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Personality</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(4)}
          >
            {lifestyle.personality.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>
            Personal Wealth
          </Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(5)}
          >
            Personal Wealth
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Marital Status</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(6)}
          >
            {lifestyle.marital_status.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>
            Religious Status
          </Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(7)}
          >
            {lifestyle.religious_status.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Children</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(8)}
          >
            {lifestyle.children.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Siblings</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(9)}
          >
            {lifestyle.siblings.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Living Status</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(10)}
          >
            {lifestyle.living_status.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Move</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(11)}
          >
            {lifestyle.move.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Diet</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(12)}
          >
            {lifestyle.diet.label}
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>Smoking</Text>
          <Text
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "grey",
              color: "grey",
              // backgroundColor: "#fff",
              padding: 3,
              textAlign: "left",
              margin: 5,
            }}
            onPress={() => textinput_onpress(13)}
          >
            {lifestyle.smoking.label}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 86 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => save_btn_onpress(lifestyle)}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {route.params?.SECTION == "personal" && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              color: "purple",
            }}
          >
            Personal
          </Text>
          <Text style={{ marginLeft: 5, color: "purple" }}>
            {obj.about.title}
          </Text>
          <TextInput
            placeholder={obj.about.placeholder}
            placeholderTextColor="grey"
            defaultValue={personal.about.key}
            onChangeText={(a) => updateField({ about_input: a })}
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
          <Text style={{ marginLeft: 5, color: "purple" }}>
            {obj.work.title}
          </Text>
          <TextInput
            placeholder={obj.work.placeholder}
            placeholderTextColor="grey"
            defaultValue={personal.work.key}
            onChangeText={(b) => updateField({ work_input: b })}
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
          <Text style={{ marginLeft: 5, color: "purple" }}>
            {obj.seeking.title}
          </Text>
          <TextInput
            placeholder={obj.seeking.placeholder}
            placeholderTextColor="grey"
            defaultValue={personal.seeking.key}
            onChangeText={(c) => updateField({ seeking_input: c })}
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

          <View style={{ flexDirection: "row", marginTop: 86 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                marginTop: 10,
                minWidth: 195,
                borderRadius: 10,
              }}
              onPress={() => personal_submit()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {Modalvisible == true && (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={Modalvisible}
        >
          <ScrollView>
            {testarray[i].options.map((item, index) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => list_onpress(item.key, item.label, item.vvv)}
              >
                <Text
                  style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "grey",
                    color: "black",
                    backgroundColor: "lightgrey",
                    padding: 3,
                    textAlign: "left",
                    margin: 5,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      )}
    </>
  );
}
export default EditProfileForm;
