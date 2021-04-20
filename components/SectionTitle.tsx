import React from "react";
import styled from "styled-components/native";
import constants from "../constants";

const Container = styled.View`
  width: ${constants.width / 1.15}px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-family: "WorkSans_600SemiBold";
  font-size: 16px;
  color: ${(prop) => prop.theme.titleColor};
`;

export default ({ text }: { text: string }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);
