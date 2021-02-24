import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useState, useContext } from "react";

interface AuthProviderP {
  initLoggedIn: boolean;
  children: React.ReactChild;
}

const AuthContext: React.Context<{}> = createContext({});

export const AuthProvider: React.FC<AuthProviderP> = ({
  initLoggedIn,
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initLoggedIn);

  const logIn = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("token", `bearer ${token}`);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ logIn, logOut, isLoggedIn }}
      children={children}
    />
  );
};

export const useLogIn = () => {
  const { logIn }: any = useContext(AuthContext);
  return logIn;
};

export const useLogOut = () => {
  const { logOut }: any = useContext(AuthContext);
  return logOut;
};

export const useCheckLogIn = (): boolean => {
  const { isLoggedIn }: any = useContext(AuthContext);
  return isLoggedIn;
};
