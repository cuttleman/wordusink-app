import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator size={"large"} color={"#ffffff"} />
  </Container>
);
