import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import theme from "../theme";
import { NewP } from "../types/interfaces";
import SectionTitle from "./SectionTitle";

const Container = styled.View`
  flex: 1;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  padding: 30px;
  justify-content: space-between;
`;

const InputContainer = styled.View`
  align-items: center;
`;

const TextInputS = styled.TextInput`
  width: ${constants.width / 1.5}px;
  background-color: white;
  padding: 10px 15px;
  border-width: 0px;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px; ;
`;

const AdsContainer = styled.View`
  align-items: center;
`;

const GoogleAds = styled.View`
  width: 300px;
  height: 300px;
  background-color: green;
  align-items: center;
  justify-content: center;
`;

export default ({ name, caption }: NewP) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <InputContainer>
          <SectionTitle text={"단어 이름 ( 예> apple ) *"} />
          <TextInputS
            style={{ elevation: 8 }}
            selectionColor={theme.colors.liteMainColor}
            value={name.value}
            onChangeText={name.onChangeText}
            autoCapitalize={"none"}
            maxLength={22}
            placeholder={"이름"}
          />
          <SectionTitle text={"단어 의미 ( 예> 사과 )"} />
          <TextInputS
            style={{ elevation: 8 }}
            selectionColor={theme.colors.liteMainColor}
            value={caption.value}
            onChangeText={caption.onChangeText}
            autoCapitalize={"none"}
            maxLength={8}
            placeholder={"의미 (8글자)"}
          />
        </InputContainer>
        <AdsContainer>
          <GoogleAds>
            <Text>구글 광고 자리</Text>
          </GoogleAds>
        </AdsContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
