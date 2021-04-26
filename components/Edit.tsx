import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import constants from "../constants";
import theme from "../theme";
import { EditBtnSt, EditP } from "../types/interfaces";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.View`
  width: ${constants.width / 1.1}px;
  height: ${constants.height / 1.5}px;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;
  background-color: ${(prop) => prop.theme.mainColor};
`;

const ContentsContainer = styled.View`
  align-items: center;
`;

const PhotoContainer = styled.View`
  width: ${constants.width / 1.4}px;
  height: ${constants.height / 2.6}px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ImagePreview = styled.Image`
  width: ${constants.width / 1.7}px;
  height: ${constants.width / 1.7}px;
  border-radius: 10px;
`;

const InputContainer = styled.View``;

const TextInputS = styled.TextInput`
  width: ${constants.width / 1.8}px;
  height: 40px;
  text-align: center;
  margin-bottom: 10px;
  background-color: white;
  font-size: 18px;
  font-family: "Rubik_500Medium";
  border-radius: 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity<EditBtnSt>`
  width: ${constants.width / 3}px;
  height: 40px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(prop) =>
    prop.isDone ? prop.theme.doneColor : prop.theme.deleteColor};
`;

const BtnText = styled.Text`
  color: white;
  font-family: "Rubik_500Medium";
  font-size: 19px;
`;

export default ({ url, name, caption, doneHandle, preDeleteHandle }: EditP) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <CardContainer style={{ elevation: 8 }}>
          <ContentsContainer>
            <PhotoContainer>
              <ImagePreview source={{ uri: url }} resizeMode={"contain"} />
            </PhotoContainer>
            <InputContainer>
              <TextInputS
                selectionColor={theme.liteMainColor}
                value={name.value}
                onChangeText={name.onChangeText}
                autoCapitalize={"none"}
                placeholder={"단어 이름"}
              />
              <TextInputS
                selectionColor={theme.liteMainColor}
                value={caption.value}
                onChangeText={caption.onChangeText}
                autoCapitalize={"none"}
                maxLength={7}
                placeholder={"단어 뜻 (7글자)"}
              />
            </InputContainer>
          </ContentsContainer>
          <BtnContainer>
            <Button onPress={doneHandle} isDone>
              <BtnText>Done</BtnText>
            </Button>
            <Button onPress={preDeleteHandle}>
              <BtnText>Delete</BtnText>
            </Button>
          </BtnContainer>
        </CardContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
