import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AppBar } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Logo from "./Logo";

const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <AppBar
        transparent
        color="rgb(19,19,19)"
        style={{
          marginTop: insets.top,
          marginBottom: insets.bottom,
          ...headerStyles.container,
        }}
        contentContainerStyle={{ justifyContent: "space-between", flex: "1" }}
        leading={(props) => (
          <View style={headerStyles.flexRow}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Entypo name="menu" size={32} color="white" />
            </TouchableOpacity>

            <View style={headerStyles.logo}>
              <Logo />
            </View>
          </View>
        )}
        trailing={(props) => (
          <View>
            <Text style={{ color: "white" }}>Hieudinh</Text>
          </View>
        )}
        trailingContainerStyle={{}}
      />
      <StatusBar />
    </>
  );
};

export default Header;

const headerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    paddingLeft: 20,
  },
});
