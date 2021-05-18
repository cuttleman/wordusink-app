import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import SectionTitle from "../../components/SectionTitle";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import useOpen from "../../hooks/useOpen";
import theme from "../../theme";
import { DeleteBtnSt, DeleteUserP } from "../../types/interfaces";

const Container = styled.View`
  position: absolute;
  width: ${constants.width}px;
  height: ${constants.height - 60}px;
  justify-content: flex-start;
  align-items: center;
  padding-top: 100px;
`;

const Background = styled.Pressable`
  position: absolute;
  width: ${constants.width}px;
  height: ${constants.height}px;
  background-color: ${(prop) => prop.theme.colors.opacityBlack};
`;

const Modal = styled(Animated.View)`
  background-color: ${(prop) => prop.theme.colors.bgColor};
  padding: 20px;
  width: ${constants.width / 1.2}px;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
`;

const Condition = styled.Text`
  padding-left: 20px;
  color: ${(prop) => prop.theme.colors.titleColor};
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  font-size: 14px;
`;

const Input = styled.TextInput`
  margin-top: 20px;
  margin-bottom: 30px;
  width: ${constants.width / 1.3}px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 15px;
  border-width: 0px;
  border-radius: 10px;
  align-self: center;
`;

const VerifyingBtn = styled.TouchableOpacity<DeleteBtnSt>`
  width: ${constants.width / 2}px;
  padding: 10px 0;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: ${(prop) =>
    prop.verified
      ? prop.theme.colors.darkDeleteColor
      : prop.theme.colors.titleColor};
`;

const BtnText = styled.Text`
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  color: white;
  font-size: 15px;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`;

export default ({
  isModal,
  closeDeleteView,
  preDeleteHandle,
  userName,
  email,
  images,
}: DeleteUserP) => {
  const [verified, setVerified] = useState<boolean>(false);
  const verify = useInput("");
  // 계정 삭제 버튼 클릭시 모달 이벤트 트리거
  const { slowDown } = useOpen(isModal);

  const checkSelf = () => {
    const correct = `${email}/${userName}/${images?.length}`;
    if (correct === verify.value) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  useEffect(() => {
    checkSelf();
  }, [verify.value]);

  useEffect(() => {
    verify.onChangeText("");
  }, [isModal]);

  return isModal ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Background onPress={closeDeleteView} />
        <Modal style={{ transform: [{ translateY: slowDown }] }}>
          <SectionTitle text={"조건에 맞는 문구를 입력해주세요."} />
          <Condition>{"가입 이메일/닉네임/등록된 단어 수"}</Condition>
          <Input
            style={{ elevation: 5 }}
            placeholder={"예) tomato@google.com/tomato/0"}
            value={verify.value}
            onChangeText={verify.onChangeText}
          />
          <CloseBtn onPress={closeDeleteView}>
            <Ionicons
              name={"close-sharp"}
              size={20}
              color={theme.colors.titleColor}
            />
          </CloseBtn>
          <VerifyingBtn
            style={{ elevation: 5 }}
            verified={verified}
            disabled={verified ? false : true}
            onPress={preDeleteHandle}
          >
            <BtnText>계정 삭제 확인</BtnText>
          </VerifyingBtn>
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  ) : null;
};
