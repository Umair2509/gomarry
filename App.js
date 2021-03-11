import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigations/Navigation.js";

import { Provider } from "react-redux";
import store from "./src/store";

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
