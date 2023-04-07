import React from "react";
import { Drawer } from "../Drawer";
import { useFonts } from "expo-font";

import menuConfigs from "../src/configs/menu.configs";
import Header from "../src/components/common/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Drawer
      initialRouteName="index"
      screenOptions={{
        drawerActiveTintColor: "#e91e63",
        drawerItemStyle: { marginVertical: 10 },
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#363636",
        },
      }}
    >
      {menuConfigs.main.map((item, index) => (
        <Drawer.Screen
          name={item.path}
          key={index}
          options={{
            title: `${item.display}`,
            drawerLabel: `${item.display}`,
            drawerLabelStyle: { color: "#fff" },
            headerShown: true,
            header: () => <Header />,
            drawerIcon: ({ focused }) =>
              item.typeIcon === "MaterialCommunityIcons" ? (
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color="#fff"
                />
              ) : item.typeIcon === "Ionicons" ? (
                <Ionicons name={item.icon} size={24} color="#fff" />
              ) : null,
          }}
        />
      ))}
    </Drawer>
  );
};

export default Layout;
