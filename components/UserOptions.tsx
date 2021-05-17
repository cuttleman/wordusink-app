import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, Alert } from "react-native";
import styled from "styled-components/native";
import { useLogOut } from "./AuthContext";
import { UserOptionsP } from "../types/interfaces";

const Container = styled(Animated.View)`
  position: absolute;
  right: 0;
  height: 60px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  overflow: hidden;
`;

const CloseBtn = styled.TouchableOpacity`
  width: 30px;
  height: 60px;
  background-color: ${(prop) => prop.theme.colors.darkDeleteColor};
  justify-content: center;
  align-items: center;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  padding: 0 10px;
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

  const preLogOut = () => {
    Alert.alert(
      "",
      "로그아웃하시겠습니까?",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        { text: "예", onPress: () => logOut() },
      ],
      { cancelable: false }
    );
  };
  return (
    <Container style={{ transform: [{ translateX: animation }] }}>
      <CloseBtn onPress={toggleFunc}>
        <BtnText>x</BtnText>
      </CloseBtn>
      <OptionsContainer>
        <FuncBtn onPress={preLogOut} style={{ elevation: 5 }}>
          <BtnText>로그아웃</BtnText>
        </FuncBtn>
        <FuncBtn
          onPress={() => {
            toggleFunc();
            return navigate("EditProfile", { userInfo });
          }}
          isEdit
          style={{ elevation: 5 }}
        >
          <BtnText>수정</BtnText>
        </FuncBtn>
      </OptionsContainer>
    </Container>
  );
};
