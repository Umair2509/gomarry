import React from "react";
import { View, Text } from "react-native";
import SearchHeader from "../components/SearchHeader";
import InterestsTopTab from "../navigations/InterestsTopTab";
function InterestsScreen({ navigation }) {
  return (
    <>
      <SearchHeader navigation={navigation} header_text={"Interests"} />
      <InterestsTopTab />
    </>
  );
}
export default InterestsScreen;
