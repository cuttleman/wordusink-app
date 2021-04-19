import React from "react";
import styled from "styled-components/native";
import constants from "../constants";

const Container = styled.View`
  width: ${constants.width / 1.1}px;
  margin-bottom: 10px;
`;

const Text = styled.Text``;

export default ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);
