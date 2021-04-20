import { DefaultTheme } from "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    tabColor: string;
    mainColor: string;
    titleColor: string;
  }
}

export default {
  bgColor: "#f1f2f6",
  tabColor: "#d1d8e0",
  mainColor: "#574b90",
  titleColor: "#747d8c",
} as DefaultTheme;
