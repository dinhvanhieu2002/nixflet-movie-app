import React from "react";
import { NativeBaseProvider } from "native-base";

import { AuthProvider } from "./src/context/AuthContext";

import AppNav from "./src/navigation/AppNav";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

const App = () => {
  return <AppNav />;
};

export default () => {
  return (
    <AuthProvider>
      <NativeBaseProvider config={config}>
        <App />
      </NativeBaseProvider>
    </AuthProvider>
  );
};
