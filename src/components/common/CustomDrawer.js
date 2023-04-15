import React, { useContext } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Avatar } from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../context/AuthContext";

const CustomDrawer = (props) => {
  const { logout, userInfo } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#363636" }}
      >
        <ImageBackground
          style={{
            padding: 20,
            backgroundColor: "#363636",
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}
        >
          <Avatar bg="green.500" size="lg" mr="1">
            {userInfo?.displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {userInfo?.displayName}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#363636", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                marginLeft: 50,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
