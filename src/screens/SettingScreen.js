import React from "react";
import { View, Text } from "react-native";
import SearchHeader from "../components/SearchHeader";
import SettingsTopTab from "../navigations/SettingsTopTab";
function SettingScreen({ navigation }) {
  return (
    <>
      <SearchHeader navigation={navigation} header_text={"Settings"} />
      <SettingsTopTab />
    </>
  );
}
export default SettingScreen;
