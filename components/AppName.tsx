import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Animated, Easing } from "react-native";

const Container = styled(Animated.View)`
  margin-top: 20px;
  position: absolute;
  bottom: 20px;
`;

const Text = styled.Text`
  font-size: 45px;
  font-family: ${(prop) => prop.theme.fontFamily.gamja400};
`;

export default (): React.ReactElement => {
  const nameAni = new Animated.Value(0);

  const toUp = nameAni.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  useEffect(() => {
    Animated.timing(nameAni, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.exp),
    }).start();
  }, [nameAni]);

  return (
    <Container style={{ marginBottom: toUp }}>
      <Text>단어징어</Text>
    </Container>
  );
};
