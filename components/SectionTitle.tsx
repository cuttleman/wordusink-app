import React from "react";
import styled from "styled-components/native";
import constants from "../constants";

const Container = styled.View`
  width: ${constants.width / 1.15}px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-family: ${(prop) => prop.theme.fontFamily.workSans600};
  font-size: 16px;
  color: ${(prop) => prop.theme.colors.titleColor};
`;

export default ({ text }: { text: string }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);
