import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";
import { TabIconP } from "../types/interfaces";
import { useNavigation } from "@react-navigation/core";

const BtnContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 5px;
  border-radius: 50px;
  border-width: 0px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.mainColor};
  z-index: 999;
`;

const BtnText = styled.Text`
  font-size: 25px;
  color: ${(prop) => prop.theme.bgColor};
`;

export default ({ focused = false, iconName = "home" }: TabIconP) => {
  const navigation = useNavigation();
  return iconName !== "add-circle" ? (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      size={30}
      color={focused ? theme.mainColor : "black"}
    />
  ) : (
    <BtnContainer
      onPress={() => navigation.navigate("Add")}
      style={{ elevation: 5 }}
    >
      <BtnText>+</BtnText>
    </BtnContainer>
  );
};
