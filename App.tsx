import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import apolloOptions from "./apollo";
import NavController from "./components/NavController";
import { AuthProvider } from "./components/AuthContext";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [
    clientS,
    setClientS,
  ] = useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({ ...Ionicons.font });
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
      });
      const client = new ApolloClient({
        cache,
        ...apolloOptions,
      });
      const verifyLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (verifyLoggedIn === "false" || verifyLoggedIn === null) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setClientS(client);
      setIsLoaded(true);
    } catch (e) {}
  };

  useEffect(() => {
    preLoad();
  }, []);

  return isLoaded && clientS && isLoggedIn !== null ? (
    <ApolloProvider client={clientS}>
      <AuthProvider initLoggedIn={isLoggedIn}>
        <NavController />
      </AuthProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
};

export default App;
