import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../screens/SigninScreen";
import Signup from "../screens/SignupScreen";
import Dashboard from "../screens/Dashboard";
import DashboardDrawer from "../navigations/DashboardDrawer";
import RequestScreen from "../screens/RequestScreen";
import SurveyHeader from "../components/SurveyHeader";
import SearchHeader from "../components/SearchHeader";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import SignupStage1Screen from "../screens/SignupStage1Screen";
import SignupCompleteScreen from "../screens/SignupCompleteScreen";
import SignupStage2Screen from "../screens/SignupStage2Screen";
import SignupStage3Screen from "../screens/SignupStage3Screen";
import UserCard from "../components/UserCard";
import ProfileCard from "../screens/ProfileCard";
import FullImage from "../screens/FullImage";
import ComparisonScreen from "../screens/ComparisonScreen";
import SurveyScreen from "../screens/SurveyScreen";
import EditProfileForm from "../screens/EditProfileForm";
import LaunchScreen from "../screens/LaunchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ConversationScreen from "../screens/ConversationScreen";
const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LaunchScreen"
        component={LaunchScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signin"
        component={Signin}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={DashboardDrawer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VerifyEmailScreen"
        component={VerifyEmailScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupStage1Screen"
        component={SignupStage1Screen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupCompleteScreen"
        component={SignupCompleteScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupStage2Screen"
        component={SignupStage2Screen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupStage3Screen"
        component={SignupStage3Screen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserCard"
        component={UserCard}
      />
      <Stack.Screen
        options={{ headerShown: true, title: "Profile" }}
        name="ProfileCard"
        component={ProfileCard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FullImage"
        component={FullImage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ComparisonScreen"
        component={ComparisonScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SurveyScreen"
        component={SurveyScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditProfileForm"
        component={EditProfileForm}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MessageScreen"
        component={MessageScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, title: "Messages" }}
        name="ConversationScreen"
        component={ConversationScreen}
      />
    </Stack.Navigator>
  );
}
export default Navigation;
