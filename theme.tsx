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
    };
    fontFamily: {
      rubik500: string;
      rubik400: string;
      workSans400: string;
      workSans600: string;
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
  },
  fontFamily: {
    rubik500: "Rubik_500Medium",
    rubik400: "Rubik_400Regular",
    workSans400: "WorkSans_400Regular",
    workSans600: "WorkSans_600SemiBold",
  },
} as DefaultTheme;
