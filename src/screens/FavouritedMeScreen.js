import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Api from "../../service/Api";
import UserCard from "../components/UserCard";
import { Icon } from "react-native-elements";
function FavouritedMeScreen({ navigation }) {
  const [state, setState] = useState({
    search_array: [],
    refreshing: false,
    loading: false,
  });

  const { search_array, refreshing, loading } = state;
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
  useEffect(() => {
    updateField({ loading: true });
    Api.interests("favouritedme", 1, 50)
      .then((data) => {
        console.log(data, "favouritedme Api response");
        updateField({ search_array: data.users });
        // console.log(search_array, "search_array");
        updateField({ loading: false });
      })
      .catch((err) => {});
  }, []);
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "86%",
          backgroundColor: "white",
          marginLeft: "14%",
        }}
      />
    );
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator
          color="red"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          {search_array.length == 0 ? (
            <View
              style={{
                marginTop: 50,
                flexDirection: "column",
              }}
            >
              <Icon
                name="account-search"
                type="material-community"
                color="grey"
                size={45}
              ></Icon>
              <Text
                style={{
                  marginLeft: 145,
                }}
              >
                No User Found
              </Text>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <FlatList
                data={search_array}
                renderItem={({ item }) => (
                  <UserCard data={item} navigation={navigation} />
                )}
                horizontal={false}
                numColumns={2}
                ItemSeparatorComponent={renderSeparator}
              ></FlatList>
            </View>
          )}
        </>
      )}
    </>
  );
}
export default FavouritedMeScreen;
