import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, ToastAndroid, FlatList } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import Api from "../../service/Api";
import _ from "lodash";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native";
import { ImageBackground } from "react-native";
import { ActivityIndicator } from "react-native";
export default function SignupStage2Screen({ route, navigation }) {
  // console.log(route.params?.Live_loc, "live location in stage 2");
  const [state, setState] = useState({
    search_location,
    searching: false,
    location_suggestions: [],
    section: "location",
    location_done: 0,
    arrr,
    obj: {},
    obj_array: [],
    i: 0,
    input_array: [],
    j: 1,
    added_text: "",
    search_option,
    loading: true,
  });
  const {
    search_location,
    searching,
    location_suggestions,
    section,
    location_done,
    arrr,
    obj,
    obj_array,
    i,
    input_array,
    added_text,
    search_option,
    loading,
  } = state;

  useEffect(() => {
    firstfunction();
  }, []);
  const firstfunction = () => {
    Api.whoami()
      .then((data) => {
        console.log(data, "whooooomiiii");

        if (data.user.data.profile.personal.seeking !== null) {
          console.log("checkedddd");
          navigation.navigate("SignupStage3Screen");
        }
        if (data.user.meta.location_id != 1) {
          updateField({ location_done: 1 });
        }

        var obj = data.attributes;
        delete obj.dob;
        delete obj.gender;
        var temp = data.attributes;
        delete temp.dob;
        delete temp.gender;
        for (var t in temp) {
          if (data.user.data.profile[temp[t].section][temp[t].key] != null) {
            console.log(obj[t], "deleted question");
            delete obj[t];
          }
        }

        console.log(obj, "questions remaining");
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
                    });
                  }
                } else {
                  optionArry.push({
                    key: v,
                    label: option,
                    value: v,
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
        updateField({ obj_array: testarray });
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
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
  const selectLocation = (id, string) => {
    updateField({ loading: true });
    Api.updateProfile(section, { location: id })
      .then((res) => {
        updateField({ location_done: 1 });
        updateField({ section: obj_array[i].section });
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
        updateField({ loading: false });
      });
  };
  const renderLocation = ({ item }) => (
    <View
      style={{
        backgroundColor: "coral",
        borderRadius: 10,
        margin: 5,
        padding: 3,
      }}
    >
      <ListItem
        bottomDivider
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "grey",
          color: "black",
          backgroundColor: "lightgrey",
          padding: 1,
          textAlign: "left",
          // margin: 3,
        }}
        onPress={() => selectLocation(item.id, item.string)}
      >
        <ListItem.Content>
          <ListItem.Title>{item.string}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "coral",
        borderRadius: 10,
        margin: 5,
        padding: 3,
      }}
    >
      <ListItem
        bottomDivider
        onPress={() => {
          selectquestions(item.key);
          if (i < 24) {
            updateField({ i: i + 1 });
          }
        }}
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "grey",
          color: "black",
          backgroundColor: "lightgrey",
          padding: 1,
          textAlign: "left",
          // margin: 3,
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.label}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );

  const selectquestions = (key) => {
    updateField({ loading: true });

    Api.updateProfile(obj_array[i].section, { [obj_array[i].key]: key })
      .then((res) => {})
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
        updateField({ loading: false });
      });
  };
  const text_input = (Section) => {
    if (added_text == "") {
      ToastAndroid.show("Please fill field", ToastAndroid.SHORT);
    } else {
      Api.updateProfile(Section, { [obj_array[i].key]: added_text })
        .then((res) => {})
        .catch((error) => {
          ToastAndroid.show(error, ToastAndroid.SHORT);

          updateField({ loading: false });
        });
      updateField({ added_text: "" });
      if (obj_array[i].key == "seeking") {
        console.log("hello");
        navigation.navigate("SignupStage3Screen");
      }

      updateField({ i: i + 1 });
    }
  };
  const SearchOption = (search_option) => {};
  // console.log(obj_array[1].options[0].label,"array data")
  return (
    <>
      <ImageBackground
        source={require("../images/multi1.jpg")}
        style={{ flex: 1 }}
        blurRadius={4}
      >
        <View style={{ marginTop: 20 }}>
          {location_done === 0 ? (
            <>
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
                    // inputStyle={{backgroundColor: 'white'}}
                    containerStyle={{
                      backgroundColor: "white",
                      borderWidth: 3,
                      borderRadius: 40,
                      borderColor: "coral",
                    }}
                    placeholderTextColor={"#g5g5g5"}
                  />
                }
                data={location_suggestions}
                renderItem={renderLocation}
                keyExtractor={(item) => item.id}
              ></FlatList>
              {route.params?.Live_loc == undefined ? (
                <Text> </Text>
              ) : (
                <Text
                  style={{
                    color: "white",
                    margin: 10,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {route.params?.Live_loc}
                </Text>
              )}
            </>
          ) : obj_array.length !== 0 &&
            obj_array[i]?.input !== undefined &&
            obj_array[i].input == "select" ? (
            <>
              <View
                style={{
                  backgroundColor: "coral",
                  borderRadius: 10,
                  margin: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    color: "black",
                    fontSize: 20,
                    fontWeight: "500",
                    fontStyle: "italic",
                  }}
                >
                  Q: {obj_array[i].placeholder}
                </Text>
              </View>
              <FlatList
                // ListHeaderComponent={
                //   <SearchBar
                //     showLoading={searching}
                //     platform={Platform.OS}
                //     round={true}
                //     lightTheme={true}
                //     placeholder={obj_array[i].key}
                //     autoCapitalize="none"
                //     autoCorrect={false}
                //     onChangeText={SearchOption}
                //     value={search_option}
                //   />
                // }
                data={obj_array[i].options}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
              ></FlatList>
            </>
          ) : (
            obj_array.length !== 0 &&
            obj_array[i]?.title !== undefined && (
              <>
                <View
                  style={{
                    backgroundColor: "coral",
                    borderRadius: 10,
                    margin: 10,
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    placeholder={obj_array[i].title}
                    onChangeText={(added_text) => updateField({ added_text })}
                    multiline={true}
                    textAlignVertical={"top"}
                    style={{
                      backgroundColor: "lightgrey",
                      borderRadius: 10,
                      margin: 3,
                      padding: 10,
                      height: 150,
                    }}
                  ></TextInput>
                </View>
                <TouchableOpacity
                  style={{
                    fontSize: 16,
                    color: "white",
                    backgroundColor: "coral",
                    padding: 10,
                    marginTop: 10,
                    minWidth: 250,
                    borderRadius: 10,
                    margin: 10,
                  }}
                  onPress={() => text_input(obj_array[i].section)}
                >
                  <Text style={{ color: "black", textAlign: "center" }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </>
            )
          )}
        </View>
      </ImageBackground>
    </>
  );
}
