import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderStack from "../components/common/HeaderStack";

import { MediaDetailScreen, PersonDetailScreen } from "../screens";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Authenticated" screenOptions={{}}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Authenticated"
        component={DrawerNavigator}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          header: (props) => <HeaderStack {...props} navigation={navigation} />,
        })}
        name="MediaDetail"
        component={MediaDetailScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          header: (props) => <HeaderStack {...props} navigation={navigation} />,
        })}
        name="PersonDetail"
        component={PersonDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
