import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Animated, Easing } from "react-native";
import { AuthButtonP, AuthBtnSt } from "../types/interfaces";
import constants from "../constants";

const Container = styled(Animated.View)``;

const Btn = styled.TouchableOpacity<AuthBtnSt>`
  padding: 20px 35px;
  border-top-left-radius: 20px;
  background-color: #574b90;
  display: flex;
  border-width: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextSt = styled.Text`
  color: white;
  font-size: 17px;
  font-family: ${(prop) => prop.theme.fontFamily.workSans600};
`;

export default ({ text, type, onPress }: AuthButtonP) => {
  const slideAni = new Animated.Value(0);

  const slideToLeft = slideAni.interpolate({
    inputRange: [0, 1],
    outputRange: [-180, 0],
  });

  useEffect(() => {
    Animated.timing(slideAni, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [slideAni]);

  return (
    <Container style={{ marginRight: slideToLeft }}>
      <Btn type={type} onPress={onPress}>
        <TextSt>{text}</TextSt>
      </Btn>
    </Container>
  );
};
