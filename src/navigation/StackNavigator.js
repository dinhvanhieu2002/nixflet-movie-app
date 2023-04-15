import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MediaDetailScreen, PersonDetailScreen } from "../screens";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Authenticated"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Authenticated"
        component={DrawerNavigator}
      />
      <Stack.Screen name="MediaDetail" component={MediaDetailScreen} />

      <Stack.Screen name="PersonDetail" component={PersonDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
