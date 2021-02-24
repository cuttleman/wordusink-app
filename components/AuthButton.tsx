import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import constants from "../constants";

interface AuthButtonP {
  text: string;
  type?: string;
  onPress: () => void;
}

interface ContainerP {
  type: string | undefined;
}

const Container = styled(TouchableOpacity)<ContainerP>`
  width: ${constants.width / 2}px;
  padding: 15px 0;
  border-radius: 5px;
  background-color: ${(props) =>
    props.type === "google" ? "#e94335" : "#ffffff"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextSt = styled(Text)`
  color: white;
  font-weight: 700;
  font-size: 15px;
`;

export default ({ text, type, onPress }: AuthButtonP) => (
  <Container type={type} onPress={onPress}>
    <TextSt>{text}</TextSt>
  </Container>
);
