import React from "react";
import { View, Text } from "react-native";
import SearchHeader from "../components/SearchHeader"
import ProfileCardTopTab from "../navigations/ProfileCardTopTab";
import RequestScreenTopTab from "../navigations/RequestScreenTopTab";

function RequestScreen({navigation}) {
  return (
   <>
      <SearchHeader navigation={navigation} header_text={"Requests"} /> 
      
      <RequestScreenTopTab />
     
  </>
  );
}
export default RequestScreen;
