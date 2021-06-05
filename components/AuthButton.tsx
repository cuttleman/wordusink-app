import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Animated, Easing } from "react-native";
import { AuthButtonP, AuthBtnSt } from "../types/interfaces";
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled(Animated.View)``;

const Btn = styled.TouchableOpacity<AuthBtnSt>`
  padding: 10px 35px;
  padding-right: 15px;
  border-top-left-radius: 20px;
  background-color: #574b90;
  border-width: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextSt = styled.Text`
  color: white;
  font-size: 18px;
  font-family: ${(prop) => prop.theme.fontFamily.noto700};
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
      duration: 1100,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [slideAni]);

  return (
    <Container style={{ marginRight: slideToLeft }}>
      <Btn type={type} onPress={onPress}>
        <TextSt>{text}</TextSt>
        <MaterialIcons
          name={"keyboard-arrow-right"}
          size={20}
          color="white"
          style={{ marginLeft: 5 }}
        />
      </Btn>
    </Container>
  );
};
