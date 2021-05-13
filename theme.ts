import { DefaultTheme } from "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      tabColor: string;
      mainColor: string;
      titleColor: string;
      liteMainColor: string;
      cardIconColor: string;
      doneColor: string;
      deleteColor: string;
      darkDeleteColor: string;
      closeColor: string;
      opacityBlack: string;
    };
    fontFamily: {
      rubik500: string;
      rubik400: string;
      gamja400: string;
      noto400: string;
      noto500: string;
      noto700: string;
    };
  }
}

export default {
  colors: {
    bgColor: "#f1f2f6",
    tabColor: "#d1d8e0",
    mainColor: "#574b90",
    titleColor: "#747d8c",
    liteMainColor: "#9980FA",
    cardIconColor: "#474787",
    doneColor: "#70a1ff",
    deleteColor: "#1289A7",
    darkDeleteColor: "#c23616",
    opacityBlack: "#00000099",
    closeColor: "#eb2f06",
  },
  fontFamily: {
    rubik500: "Rubik_500Medium",
    rubik400: "Rubik_400Regular",
    gamja400: "GamjaFlower_400Regular",
    noto400: "NotoSansKR_400Regular",
    noto500: "NotoSansKR_500Medium",
    noto700: "NotoSansKR_700Bold",
  },
} as DefaultTheme;
