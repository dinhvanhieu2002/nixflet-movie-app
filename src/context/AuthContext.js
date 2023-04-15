import React, { createContext, useState, useEffect } from "react";
import userApi from "../api/modules/user.api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (values) => {
    setErrorMessage(undefined);
    setIsLoading(true);
    const { response, error } = await userApi.signin(values);
    setIsLoading(false);
    if (response) {
      setUserInfo(response);
      setUserToken(response.token);
      await AsyncStorage.setItem("userToken", response.token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(response));
      return response;
    }

    if (error) {
      setErrorMessage(error.message);
    }
  };

  const signup = async (values) => {
    setErrorMessage(undefined);
    setIsLoading(true);
    const { response, error } = await userApi.signup(values);
    setIsLoading(false);
    if (response) {
      return response;
    }

    if (error) {
      setErrorMessage(error.message);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        userToken,
        userInfo,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
