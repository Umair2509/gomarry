import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SearchHeader from "../components/SearchHeader";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { ListItem, Icon, SearchBar, CheckBox } from "react-native-elements";
import Api from "../../service/Api";
import { ScrollView } from "react-native-gesture-handler";

// import { TouchableOpacity } from "react-native-gesture-handler";

function SearchScreen({ navigation }) {
  const [multiSliderValue, setMultiSliderValue] = useState([18, 99]);
  const [Distanceslider, setDistanceslider] = useState([5]);
  const [Location_modal, setLocation_modal] = useState(false);
  const [Options_modal, setOptions_modal] = useState(false);
  const [Advance_show, setAdvance_show] = useState(false);
  const [Dataloading, setDataloading] = useState(true);
  const [userdata, setuserdata] = useState();
  useEffect(() => {
    setDataloading(true);
    Api.whoami()
      .then((data) => {
        console.log(data, "who am i data in search screen");
        setuserdata(data);
        var names_array = [];
        var names = data.attributes;
        delete names.dob;
        delete names.gender;
        delete names.about;
        delete names.work;
        delete names.seeking;
        // for (var n in names) {
        //   if (names.hasOwnProperty(n)) {
        //     // console.log(names[n].title, "names");
        //     names_array.push(names[n].title);
        //   }
        // }

        var testarray = [];
        for (var a in names) {
          if (names.hasOwnProperty(a)) {
            if (names[a].profile.inputType == "select") {
              var options = names[a].options;
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
                      vvv: names[a].key,
                    });
                  }
                } else {
                  optionArry.push({
                    key: v,
                    label: option,
                    value: v,
                    vvv: names[a].key,
                  });
                }
              }
              testarray.push({
                key: a,
                section: names[a].section,
                options: optionArry,
                placeholder: names[a].title,
                input: names[a].profile.inputType,
              });
            }
            if (names[a].profile.inputType == "textarea") {
              testarray.push({
                key: a,
                section: names[a].section,
                title: names[a].title,
                input: names[a].profile.inputType,
              });
            }
          }
        }
        // console.log(testarray, "testarray");
        // console.log(names_array, "names_array");
        updateField({ attribute_names: names_array, opt_array: testarray });
        setDataloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Location_modal]);

  const multiSliderValuesChange = (values) => setMultiSliderValue(values);
  const DistancesliderValuesChange = (values) => setDistanceslider(values * 5);

  const [state, setState] = useState({
    search_location,
    searching: false,
    location_suggestions: [],
    attribute_names,
    opt_array,
    i: 0,
    name,
    trusted_member: false,
    premium: false,
    with_photos: false,
    with_videos: false,
    attr: {
      ethnic_origin: [],
      nationality: [],
      language: [],
      second_language: [],
      personality: [],
      personal_wealth: [],
      marital_status: [],
      religious_status: [],
      children: [],
      siblings: [],
      living_status: [],
      move: [],
      diet: [],
      smoking: [],
      education: [],
      profession: [],
      ambition: [],
      eye_colour: [],
      hair_colour: [],
      body_type: [],
      height: [],
    },
    val,
  });
  const {
    search_location,
    searching,
    location_suggestions,
    attribute_names,
    opt_array,
    i,
    name,
    trusted_member,
    premium,
    with_photos,
    with_videos,
    attr,
    val,
  } = state;
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  const render_selected = ({ item, index }) => (
    <ListItem

    // onPress={() => selectAttribute(index, item.placeholder)}
    >
      <ListItem.Content>
        <ListItem.Title>
          <View style={{ flexDirection: "row" }}>
            <Text>{item}</Text>
            <View style={{ marginLeft: 3 }}>
              <Icon
                name="close"
                type="simple-line-icon"
                color="purple"
                size={18}
                onPress={() => closeIconPress(item)}
              ></Icon>
            </View>
          </View>
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  const closeIconPress = (item) => {
    const ind = attr[val].indexOf(item);
    if (ind > -1) {
      attr[val].splice(ind, 1);
    }
  };
  const rendera_attributes = ({ item, index }) => (
    <ListItem
      // containerStyle={{
      //   backgroundColor: "transparent",
      //   // opacity: 0.5,
      // }}
      onPress={() => selectAttribute(index, item)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.placeholder}</ListItem.Title>
      </ListItem.Content>
      <Icon
        name="keyboard-arrow-right"
        type="MaterialIcons"
        color="purple"
        size={25}
        style={{ marginLeft: 8 }}
      ></Icon>
    </ListItem>
  );
  const selectAttribute = (index, n) => {
    setOptions_modal(true);
    updateField({ i: index, name: n.placeholder, val: n.key });
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
    setLocation_modal(false);
    // navigation.goBack();
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
  const listOnpress = (l, v) => {
    if (attr[v].indexOf(l) != -1) {
      const index = attr[v].indexOf(l);
      if (index > -1) {
        attr[v].splice(index, 1);
      }
    } else {
      attr[v].push(l);
    }
    console.log(attr[v], "array");
  };
  const closePress = () => {
    attr[val] = [];
    setOptions_modal(false);
  };
  const on_submit = () => {
    // console.log(multiSliderValue[0], "final");
    var element = {};
    element.distance = Distanceslider;
    element.age_from = multiSliderValue[0];
    element.age_to = multiSliderValue[1];
    if (trusted_member == true) {
      element.trusted_member = 1;
    }
    if (premium == true) {
      element.premium = 1;
    }
    if (with_photos == true) {
      element.with_photos = 1;
    }
    if (with_videos == true) {
      element.with_videos = 1;
    }
    // element.id = "10";
    // element.quantity = "abc";
    console.log(element, "final element");
  };
  return (
    <>
      <ScrollView>
        {Dataloading ? (
          <ActivityIndicator color="red" style={{ marginTop: 350 }} />
        ) : (
          <View>
            <SearchHeader navigation={navigation} header_text={"Search"} />
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ marginTop: 15, fontSize: 16, color: "purple" }}>
                Distance ({Distanceslider} KM)
              </Text>
              <MultiSlider
                trackStyle={{ backgroundColor: "#bdc3c7" }}
                selectedStyle={{ backgroundColor: "purple", height: 2 }}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 20,
                      width: 20,
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                    },
                    android: {
                      height: 20,
                      width: 20,
                      borderRadius: 50,
                      backgroundColor: "#bdc3c7",
                    },
                  }),
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
                values={Distanceslider}
                sliderLength={280}
                onValuesChange={DistancesliderValuesChange}
                min={1}
                max={300}
                allowOverlap={false}
                // minMarkerOverlapDistance={10}
              />

              <Text style={{ marginTop: 6, fontSize: 16, color: "purple" }}>
                Age Range ({multiSliderValue[0]}-{multiSliderValue[1]} years)
              </Text>
              <MultiSlider
                trackStyle={{ backgroundColor: "#bdc3c7" }}
                selectedStyle={{ backgroundColor: "purple", height: 2 }}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 20,
                      width: 20,
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                    },
                    android: {
                      height: 20,
                      width: 20,
                      borderRadius: 50,
                      backgroundColor: "#bdc3c7",
                    },
                  }),
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
                values={[multiSliderValue[0], multiSliderValue[1]]}
                sliderLength={280}
                onValuesChange={multiSliderValuesChange}
                min={18}
                max={99}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
              />
            </View>
            <ListItem
              containerStyle={{
                backgroundColor: "transparent",
              }}
              onPress={() => setLocation_modal(true)}
            >
              <Icon
                name="location-pin"
                type="entypo"
                color="purple"
                size={25}
              ></Icon>
              <ListItem.Content>
                <ListItem.Title>Location</ListItem.Title>
                <ListItem.Subtitle>
                  {userdata.user.meta.location}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                name="keyboard-arrow-right"
                type="MaterialIcons"
                color="purple"
                size={25}
                style={{ marginLeft: 8 }}
              ></Icon>
            </ListItem>
            {Advance_show ? (
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <Text
                  style={{ color: "purple" }}
                  onPress={() => setAdvance_show(!Advance_show)}
                >
                  Show Less
                </Text>
                <Icon
                  name="keyboard-arrow-up"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  style={{ marginLeft: 8 }}
                  onPress={() => setAdvance_show(!Advance_show)}
                ></Icon>
              </View>
            ) : (
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <Text
                  style={{ color: "purple" }}
                  onPress={() => setAdvance_show(!Advance_show)}
                >
                  Advance Search Option
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  color="purple"
                  size={25}
                  style={{ marginLeft: 8 }}
                  onPress={() => setAdvance_show(!Advance_show)}
                ></Icon>
              </View>
            )}
            {Advance_show && (
              <FlatList
                data={opt_array}
                renderItem={rendera_attributes}
                // keyExtractor={(item) => item}
              ></FlatList>
            )}
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                containerStyle={{
                  minWidth: 180,
                  backgroundColor: "transparent",
                }}
                title="Trusted Members"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="purple"
                checked={trusted_member}
                onPress={() => updateField({ trusted_member: !trusted_member })}
              ></CheckBox>
              <CheckBox
                containerStyle={{
                  minWidth: 180,
                  backgroundColor: "transparent",
                }}
                title="With Photos"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="purple"
                checked={with_photos}
                onPress={() => updateField({ with_photos: !with_photos })}
              ></CheckBox>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                containerStyle={{
                  minWidth: 180,
                  backgroundColor: "transparent",
                }}
                title="Premium"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="purple"
                checked={premium}
                onPress={() => updateField({ premium: !premium })}
              ></CheckBox>
              <CheckBox
                containerStyle={{
                  minWidth: 180,
                  backgroundColor: "transparent",
                }}
                title="With Videos"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="purple"
                checked={with_videos}
                onPress={() => updateField({ with_videos: !with_videos })}
              ></CheckBox>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#31a300",
                padding: 10,
                margin: 5,
                borderRadius: 10,
              }}
              onPress={() => on_submit()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {Location_modal && (
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={Location_modal}
          >
            <View style={{ marginTop: 5 }}>
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
                    containerStyle={{
                      backgroundColor: "lightgrey",
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: "purple",
                      margin: 5,
                    }}
                  />
                }
                data={location_suggestions}
                renderItem={renderLocation}
                keyExtractor={(item) => item.id}
              ></FlatList>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginTop: 5,
                }}
              >
                <Icon
                  name="location-pin"
                  type="entypo"
                  color="purple"
                  size={19}
                ></Icon>
                <Text style={{ paddingLeft: 5, fontSize: 18, color: "black" }}>
                  {userdata.user.meta.location}
                </Text>
              </View>
            </View>
          </Modal>
        )}
        {Options_modal && (
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={Options_modal}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Icon
                  name="close"
                  type="AntDesign"
                  color="purple"
                  size={30}
                  onPress={() => closePress()}
                />
                <Text
                  style={{
                    marginLeft: 80,
                    marginRight: 70,
                    maxWidth: 170,
                    minWidth: 170,
                    fontSize: 20,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {name}
                </Text>

                <Icon
                  name="check"
                  type="AntDesign"
                  color="purple"
                  size={30}
                  onPress={() => setOptions_modal(false)}
                />
              </View>
              <FlatList
                data={attr[val]}
                renderItem={render_selected}
                keyExtractor={(item) => item}
                horizontal={true}
                // numColumns={2}
                // contentContainerStyle={{ margin: 10 }}
              ></FlatList>
              <ScrollView>
                {opt_array[i].options.map((item, index) => (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => listOnpress(item.label, item.vvv)}
                  >
                    <Text
                      style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "purple",
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
            </View>
          </Modal>
        )}
      </ScrollView>
    </>
  );
}
export default SearchScreen;
