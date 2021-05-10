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
`;

const ConditionContainer = styled.View`
  margin-bottom: 20px;
`;

const Conditions = styled.Text`
  color: ${(prop) => prop.theme.colors.titleColor};
  margin-bottom: 5px;
  margin-left: 15px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik400};
  font-size: 14px;
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: ${constants.width / 2}px;
  background-color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 17px;
`;

export default ({
  value,
  onChangeText,
  avatarUrl,
  avatar,
  email,
  albumTrigger,
  isClear,
  clearAvatarAction,
}: EditPProp) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AvatarContainer>
          <Avatar
            avatar={isClear ? null : avatarUrl ? avatarUrl : avatar}
            size="lg"
          />

          <AvatarEditBtn
            style={{ elevation: 4, top: 0, right: 0 }}
            onPress={clearAvatarAction}
          >
            <MaterialIcons name={"cancel"} color="black" size={23} />
          </AvatarEditBtn>
          <AvatarEditBtn
            style={{ elevation: 4, bottom: 0, right: 0 }}
            onPress={albumTrigger}
          >
            <MaterialIcons name={"edit"} color="black" size={23} />
          </AvatarEditBtn>
        </AvatarContainer>
        <InputContainer>
          <SectionTitle text="닉네임 *" />
          <ConditionContainer>
            <Conditions> _ . 은 문자 중간에만 입력할 수 있습니다.</Conditions>
            <Conditions>띄어쓰기는 사용할 수 없습니다.</Conditions>
            <Conditions>
              닉네임은 영어, 숫자, _ . 만 사용할 수 있습니다.
            </Conditions>
            <Conditions>닉네임은 15자까지 입력할 수 있습니다.</Conditions>
          </ConditionContainer>
          <Input
            style={{ elevation: 5 }}
            placeholder="새로운 닉네임"
            onChangeText={onChangeText}
            value={value}
          />
        </InputContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
