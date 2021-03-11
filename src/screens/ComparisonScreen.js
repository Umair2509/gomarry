import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Api from "../../service/Api";
function ComparisonScreen({route}) {
  var user_id=route.params?.USER_ID;
  console.log(user_id,"user_id")
  useEffect(() => {
    // Api.whoami()
    //   .then((data) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // Api.compareSurveyAnswers(user_id)
    //   .then((data) => {
    //     console.log(data,"compareSurveyAnswers Api")
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  return (
    <View style={{ alignItems: "center", paddingTop: 111 }}>
      <Text>Comparison Screen</Text>
    </View>
  );
}
export default ComparisonScreen;
