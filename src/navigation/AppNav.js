import React, { useContext } from "react";
import MainStackNavigator from "./StackNavigator";
import { AuthContext } from "../context/AuthContext";
import { View } from "native-base";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <MainStackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
