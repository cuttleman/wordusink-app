import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <Text>Comming soon</Text>
    </Container>
  );
};
