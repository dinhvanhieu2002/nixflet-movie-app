import React from "react";
import { NativeBaseProvider } from "native-base";

import { AuthProvider } from "./src/context/AuthContext";

import AppNav from "./src/navigation/AppNav";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  return <AppNav />;
};

export default () => {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    </AuthProvider>
  );
};
