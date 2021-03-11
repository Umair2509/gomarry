import React, { useEffect, useState } from "react";
import { FlatList, BackHandler } from "react-native";
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Api from "../../service/Api";
import UserCard from "../components/UserCard";

function MostPopularScreen({ navigation }) {
  useEffect(() => {
    updateField({ dataloading: true });
    Api.search({ sort: "popular" }, 1, 6)
      .then((data) => {
        // console.log(data, "Api Data in most popular screen");
        updateField({ search_array: data.users });
        updateField({ dataloading: false });
        // console.log(search_array, "array in useEffect");
      })
      .catch((err) => {});

    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   console.log("jhvhgdc");
    //   BackHandler.exitApp();
    //   return true;
    // });

    // return () => {
    //   BackHandler.removeEventListener("hardwareBackPress");
    // };
  }, []);

  const [state, setState] = useState({
    search_array: [],
    refreshing: false,
    loading: false,
    i: 2,
    dataloading: false,
  });

  const { search_array, refreshing, loading, i, dataloading } = state;

  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };
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
  const onRefresh = () => {
    updateField({ refreshing: true });
    Api.search({ sort: "popular" }, 1, 6)
      .then((data) => {
        updateField({ search_array: data.users });
        updateField({ refreshing: false });
        console.log(search_array, "array in on refreh function");
      })
      .catch((err) => {});
  };
  const load_more = () => {
    updateField({ loading: true });
    Api.search({ sort: "popular" }, i, 6)
      .then((data) => {
        var abc = search_array.concat(data.users);
        updateField({ search_array: abc });
        updateField({ i: i + 1 });
        updateField({ loading: false });
      })
      .catch((err) => {});
  };
  const footer = () => {
    return (
      <>
        {dataloading ? (
          <ActivityIndicator
            color="red"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <View>
            <TouchableOpacity
              style={{
                fontSize: 16,
                color: "white",
                backgroundColor: "red",
                padding: 5,
                marginBottom: 10,
                marginTop: 8,
                minWidth: 50,
                borderRadius: 20,
              }}
              onPress={load_more}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{ padding: 5, color: "black", textAlign: "center" }}
                >
                  Load More
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };
  return (
    <View style={{ alignItems: "center" }}>
      <FlatList
        // keyExtractor={(item) => item}
        data={search_array}
        renderItem={({ item }) => (
          <UserCard data={item} navigation={navigation} />
        )}
        horizontal={false}
        numColumns={2}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={footer}
      ></FlatList>
    </View>
  );
}
export default MostPopularScreen;
