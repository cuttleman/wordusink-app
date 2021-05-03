import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { UserOptionsP } from "../types/interfaces";
import { useLogOut } from "./AuthContext";

const Container = styled(Animated.View)`
  position: absolute;
  right: 0;
  height: 60px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  overflow: hidden;
`;

const CloseBtn = styled.TouchableOpacity`
  width: 40px;
  height: 60px;
  background-color: ${(prop) => prop.theme.colors.closeColor};
  justify-content: center;
  align-items: center;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  padding: 0 5px;
`;

const FuncBtn = styled.TouchableOpacity<{ isEdit?: boolean }>`
  background-color: ${(prop) =>
    prop.isEdit ? prop.theme.colors.doneColor : prop.theme.colors.deleteColor};
  padding: 12px;
  margin: 0 10px;
  border-radius: 5px;
`;

const BtnText = styled.Text`
  color: white;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  font-size: 16px;
`;

export default ({ animation, toggleFunc, userInfo }: UserOptionsP) => {
  const logOut = useLogOut();
  const { navigate } = useNavigation();
  return (
    <Container style={{ transform: [{ translateX: animation }] }}>
      <CloseBtn onPress={toggleFunc}>
        <BtnText>x</BtnText>
      </CloseBtn>
      <OptionsContainer>
        <FuncBtn onPress={logOut} style={{ elevation: 5 }}>
          <BtnText>Log out</BtnText>
        </FuncBtn>
        <FuncBtn
          onPress={() => {
            toggleFunc();
            return navigate("EditProfile", { userInfo });
          }}
          isEdit
          style={{ elevation: 5 }}
        >
          <BtnText>Edit</BtnText>
        </FuncBtn>
      </OptionsContainer>
    </Container>
  );
};
