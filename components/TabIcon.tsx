import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";
import { TabIconP } from "../types/interfaces";
import { useNavigation } from "@react-navigation/core";

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.TouchableOpacity`
  border-radius: 50px;
  border-width: 0px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.mainColor};
`;

const BtnText = styled.Text`
  margin-bottom: 3px;
  font-size: 35px;
  color: ${(prop) => prop.theme.colors.bgColor};
`;

export default ({ focused = false, iconName = "home" }: TabIconP) => {
  const navigation = useNavigation();
  return iconName !== "add-circle" ? (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      size={30}
      color={focused ? theme.colors.mainColor : "black"}
    />
  ) : (
    <Container>
      <BtnContainer
        onPress={() => navigation.navigate("Add")}
        style={{ elevation: 3 }}
      >
        <BtnText>+</BtnText>
      </BtnContainer>
    </Container>
  );
};
