import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.bgColor};
`;

const Maincharacter = styled.Image`
  width: 250px;
  height: 300px;
`;

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <Maincharacter
        source={require("../../assets/soon.png")}
        resizeMode="contain"
      />
    </Container>
  );
};
