import { Dimensions } from "react-native";

interface ScreenV {
  width: number;
  height: number;
}

const constants: ScreenV = Dimensions.get("window");

export default constants;
