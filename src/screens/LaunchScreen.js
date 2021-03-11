import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import Api from "../../service/Api";
function LaunchScreen({ navigation }) {
  const [Dataloading, setDataloading] = useState(true);
  const [error, setError] = useState("true");

  useEffect(() => {
    console.log("data");
    Api.whoami()
      .then((data) => {
        console.log(data);
        if (data.user.meta.signup_stage == 1) {
          navigation.navigate("SignupStage1Screen");
        } else if (data.user.meta.signup_stage == 2) {
          navigation.navigate("SignupStage2Screen");
        } else if (data.completeness.photo != 100) {
          navigation.navigate("SignupStage3Screen");
        } else {
          navigation.navigate("Dashboard");
        }
      })
      .catch((err) => {
        setDataloading(false);
        console.log(err, "error");
        setError(err);
      });
  }, []);
  return (
    <>
      {Dataloading ? (
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
          <Text>{error}</Text>
        </View>
      )}
    </>
  );
}
export default LaunchScreen;
