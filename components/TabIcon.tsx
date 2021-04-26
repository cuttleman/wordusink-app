import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";
import { TabIconP } from "../types/interfaces";
import { useNavigation } from "@react-navigation/core";

const Container = styled.View`
  position: absolute;
  bottom: 3px;
  border-radius: 50px;
  border-width: 6px;
  border-color: ${(prop) => prop.theme.bgColor};
  background-color: ${(prop) => prop.theme.bgColor};
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.TouchableOpacity`
  border-radius: 50px;
  border-width: 0px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.mainColor};
`;

const BtnText = styled.Text`
  margin-bottom: 3px;
  font-size: 35px;
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
    <Container>
      <BtnContainer
        onPress={() => navigation.navigate("Add")}
        style={{ elevation: 5 }}
      >
        <BtnText>+</BtnText>
      </BtnContainer>
    </Container>
  );
};
