import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import theme from "../theme";
import { NewP } from "../types/interfaces";

const Container = styled.View`
  background-color: ${(prop) => prop.theme.colors.bgColor};
`;

export const NextBtn = styled.TouchableOpacity`
  padding: 10px 20px;
  margin-right: 15px;
  background-color: ${(prop) => prop.theme.colors.mainColor};
  border-radius: 10px;
`;

export const NextText = styled.Text`
  color: white;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

const TextInputS = styled.TextInput`
  height: 30px;
  width: ${constants.width / 2}px;
  border-color: black;
  border-width: 1px;
  font-size: 18px;
  text-align: center;
`;

export default ({ name, caption }: NewP) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <TextInputS
          selectionColor={theme.colors.liteMainColor}
          value={name.value}
          onChangeText={name.onChangeText}
          autoCapitalize={"none"}
          placeholder={"단어 이름"}
        />
        <TextInputS
          selectionColor={theme.colors.liteMainColor}
          value={caption.value}
          onChangeText={caption.onChangeText}
          autoCapitalize={"none"}
          maxLength={8}
          placeholder={"단어 뜻 (8글자)"}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};
