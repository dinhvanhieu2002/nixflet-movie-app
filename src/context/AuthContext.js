import React, { createContext, useState, useEffect } from "react";
import userApi from "../api/modules/user.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import favoriteApi from "../api/modules/favorite.api";

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
      return true;
    } catch (error) {
      console.log(`isLogged in error ${error}`);
      return false;
    }
  };

  const addFavorite = async (res) => {
    const favorites = await listFavorites();
    const newListFavorites = [res, ...favorites];

    await AsyncStorage.setItem(
      "listFavorites",
      JSON.stringify(newListFavorites)
    );
  };

  const removeFavorite = async (res) => {
    const { mediaId } = res;
    const favorites = await listFavorites();

    const newListFavorites = favorites.filter(
      (e) => e.mediaId.toString() !== mediaId.toString()
    );

    await AsyncStorage.setItem(
      "listFavorites",
      JSON.stringify(newListFavorites)
    );
  };

  const listFavorites = async () => {
    const favorites = await AsyncStorage.getItem("listFavorites");
    const listFavorites = JSON.parse(favorites);
    // console.log(listFavorites);
    return listFavorites;
  };

  const setListFavorites = async () => {
    const { response, error } = await favoriteApi.getList();

    if (response)
      await AsyncStorage.setItem("listFavorites", JSON.stringify(response));
    if (error) console.log(error.message);
  };

  useEffect(() => {
    if (isLoggedIn()) setListFavorites();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        addFavorite,
        removeFavorite,
        listFavorites,
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
