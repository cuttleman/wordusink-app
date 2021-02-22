import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloProvider } from "@apollo/client";
import apolloOptions from "./apollo";

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
      <View>
        <Text>Hello</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
};

export default App;
