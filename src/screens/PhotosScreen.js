import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { View, Text, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Api from "../../service/Api";
import ImageView from "react-native-image-view";
import { Icon } from "react-native-elements";
function PhotosScreen(props) {
  const [loading, setloading] = useState(true);
  const [Profiledata, setProfiledata] = useState({});
  const [imgcomp, setimgcomp] = useState(false);
  const [Imagevisible, setImagevisible] = useState();
  const [Path, setPath] = useState({});
  useEffect(() => {
    setloading(true);
    setProfiledata(props.profiledetail);
    if (Profiledata == undefined) {
      setloading(true);
    } else {
      setloading(false);
    }
  }, []);

  const UserPicture = (alias, quality = true) => {
    let extra = quality ? "" : "/3";
    return Api.uri(Api._base + "/media/image/" + alias + extra);
  };
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 3,
          width: "86%",
          backgroundColor: "white",
          marginLeft: "14%",
        }}
      />
    );
  };

  const images = [
    {
      source: UserPicture(Path),

      width: 806,
      height: 840,
    },
  ];

  const viewfullimage = (item) => {
    setPath(item);
    setImagevisible(true);
    setimgcomp(true);
  };

  const closehandle = () => {
    setImagevisible(false);
    setimgcomp(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => viewfullimage(item)}>
      <ImageBackground
        style={{ width: 96, height: 100, marginLeft: 2 }}
        source={UserPicture(item)}
      ></ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View>
      {imgcomp ? (
        <ImageView
          style={{ width: 100, height: 100 }}
          images={images}
          imageIndex={0}
          isVisible={Imagevisible}
          onClose={() => closehandle()}
          animationType="slide"
          isTapZoomEnabled={true}
        />
      ) : (
        <>
          {loading == true || Profiledata == null ? (
            <ActivityIndicator
              color="red"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <View style={{ alignItems: "flex-start" }}>
              <Text style={{ margin: 5, color: "purple", fontSize: 18 }}>
                Public Photos
              </Text>

              <>
                {Profiledata.user.albums[0].images == 0 ? (
                  <View
                    style={{
                      marginTop: 50,
                      marginBottom: 50,
                      flexDirection: "column",
                      marginLeft: 165,
                    }}
                  >
                    <Icon
                      name="camera"
                      type="font-awesome"
                      color="grey"
                      size={45}
                    ></Icon>
                    <Text>No Photos</Text>
                  </View>
                ) : (
                  <FlatList
                    horizontal={false}
                    numColumns={4}
                    ItemSeparatorComponent={renderSeparator}
                    data={Profiledata.user.albums[0].images}
                    renderItem={renderItem}
                  ></FlatList>
                )}
              </>

              <Text style={{ margin: 5, color: "purple", fontSize: 18 }}>
                Private Photos
              </Text>

              <>
                {Profiledata.user.albums[1].images == 0 ? (
                  <View
                    style={{
                      marginTop: 50,
                      flexDirection: "column",
                      marginLeft: 165,
                    }}
                  >
                    <Icon
                      name="camera"
                      type="font-awesome"
                      color="grey"
                      size={45}
                    ></Icon>
                    <Text>No Photos</Text>
                  </View>
                ) : (
                  <FlatList
                    horizontal={false}
                    numColumns={4}
                    ItemSeparatorComponent={renderSeparator}
                    data={Profiledata.user.albums[1].images}
                    renderItem={renderItem}
                  ></FlatList>
                )}
              </>
            </View>
          )}
        </>
      )}
    </View>
  );
}
export default PhotosScreen;
