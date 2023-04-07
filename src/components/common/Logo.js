import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <View style={logoStyles.container}>
      <Text style={logoStyles.normal}>
        Nix<Text style={logoStyles.constrast}>Flet</Text>
      </Text>
    </View>
  );
};

const logoStyles = StyleSheet.create({
  container: {},
  normal: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 26,
  },
  constrast: {
    color: "red",
  },
});

export default Logo;
