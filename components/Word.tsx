import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import constants from "../constants";
import { CardNameStyle, WordP } from "../types/interfaces";

const Container = styled.TouchableOpacity`
  width: ${constants.width / 1.3}px;
  height: ${constants.height / 10}px;
  background-color: white;
  margin: 10px 0;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const ContentContainer = styled.View<CardNameStyle>`
  width: ${constants.width / 3}px;
  justify-content: center;
  align-items: ${(props) => (props.isName ? "flex-start" : "flex-end")};
`;

const Name = styled.Text`
  font-size: 17px;
  font-weight: 700;
  text-transform: capitalize;
`;

const Caption = styled.Text`
  font-size: 15px;
`;

export default ({ word, words, index }: WordP) => {
  const { navigate } = useNavigation();

  return (
    <Container onPress={() => navigate("AllCards", { words, index })}>
      <ContentContainer isName>
        <Name>{word.name}</Name>
      </ContentContainer>
      <ContentContainer>
        <Caption>{word.caption}</Caption>
      </ContentContainer>
    </Container>
  );
};
