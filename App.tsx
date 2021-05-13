import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ApolloProvider } from "@apollo/client";
// import LottieView from "lottie-react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Rubik_400Regular, Rubik_500Medium } from "@expo-google-fonts/rubik";
import { GamjaFlower_400Regular } from "@expo-google-fonts/gamja-flower";
import {
  NotoSansKR_400Regular,
  NotoSansKR_700Bold,
  NotoSansKR_500Medium,
} from "@expo-google-fonts/noto-sans-kr";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import Toast from "react-native-toast-message";
import { options as apolloOptions, cache } from "./apollo";
import NavController from "./components/NavController";
import { AuthProvider } from "./components/AuthContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [clientS, setClientS] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const preLoad = async () => {
    const images = [
      require("./assets/init_human.png"),
      require("./assets/character.png"),
      require("./assets/front.png"),
      require("./assets/point.png"),
    ];
    try {
      await Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...AntDesign.font,
        Rubik_400Regular,
        Rubik_500Medium,
        GamjaFlower_400Regular,
        NotoSansKR_400Regular,
        NotoSansKR_700Bold,
        NotoSansKR_500Medium,
      });
      images.map(async (image) => Asset.fromModule(image).downloadAsync());

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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return isLoaded && clientS && isLoggedIn !== null ? (
    <ApolloProvider client={clientS}>
      <ThemeProvider theme={theme}>
        <AuthProvider initLoggedIn={isLoggedIn}>
          <NavController />
          <StatusBar barStyle="light-content" animated={true} />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
};

export default App;
