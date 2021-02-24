import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useCheckLogIn } from "./AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const isLoggedIn = useCheckLogIn();
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
