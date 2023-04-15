import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import CustomDrawer from "../components/common/CustomDrawer";

import {
  HomeScreen,
  MediaListScreen,
  SearchScreen,
  FavoriteListScreen,
  PasswordUpdateScreen,
  ReviewListScreen,
} from "../screens";
import Header from "../components/common/Header";
import menuConfigs from "../configs/menu.configs";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#e91e63",
        drawerItemStyle: { marginVertical: 10 },
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#363636",
        },
      }}
    >
      {menuConfigs.main.map((item, index) =>
        item.initialParams ? (
          <Drawer.Screen
            name={item.display}
            key={item.display}
            initialParams={{ mediaType: item.initialParams }}
            component={
              item.display === "Home"
                ? HomeScreen
                : item.display === "Search"
                ? SearchScreen
                : MediaListScreen
            }
            options={{
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
        ) : (
          <Drawer.Screen
            name={item.display}
            key={item.display}
            component={
              item.display === "Home"
                ? HomeScreen
                : item.display === "Search"
                ? SearchScreen
                : MediaListScreen
            }
            options={{
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
        )
      )}
      {menuConfigs.user.map((item, index) => (
        <Drawer.Screen
          name={item.display}
          key={item.display}
          component={
            item.display === "Favorites"
              ? FavoriteListScreen
              : item.display === "Reviews"
              ? ReviewListScreen
              : PasswordUpdateScreen
          }
          options={{
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
