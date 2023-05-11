import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppBar } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HeaderStack = ({ props, navigation }) => {
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Authenticated")}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

export default HeaderStack;

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
