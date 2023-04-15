import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen, RegisterScreen, StartScreen } from "../screens";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Start"
        component={StartScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
