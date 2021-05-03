import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Keyboard, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from "styled-components/native";
import constants from "../constants";
import { EditPProp } from "../types/interfaces";
import Avatar from "./Avatar";
import SectionTitle from "./SectionTitle";

const Container = styled.View`
  width: ${constants.width}px;
  height: ${constants.height}px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  align-items: center;
  padding-top: 30px;
`;

const AvatarContainer = styled.View`
  margin-bottom: 30px;
`;

const AvatarEditBtn = styled.TouchableOpacity`
  position: absolute;
  padding: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.colors.tabColor};
  border-radius: 30px;
  background-color: white;
  bottom: 0;
  right: 0;
`;

const InputContainer = styled.View``;

const Input = styled.TextInput`
  width: ${constants.width / 2}px;
  background-color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 17px;
`;

export default ({
  editHandle,
  setAvatarAction,
  value,
  onChangeText,
  avatar,
  email,
}: EditPProp) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AvatarContainer>
          <Avatar avatar={avatar} size={"lg"} />
          <AvatarEditBtn style={{ elevation: 4 }}>
            <MaterialIcons name={"edit"} color="black" size={23} />
          </AvatarEditBtn>
        </AvatarContainer>
        <InputContainer>
          <SectionTitle text={"User name"} />
          <Input
            style={{ elevation: 5 }}
            placeholder="new Username"
            onChangeText={onChangeText}
            value={value}
          />
        </InputContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
