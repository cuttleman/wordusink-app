import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import constants from "../constants";
import { CardNameStyle, WordP, IsCaptionP } from "../types/interfaces";

const Container = styled.TouchableOpacity`
  width: ${constants.width / 1.3}px;
  height: ${constants.height / 10}px;
  background-color: white;
  margin: 10px 0;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.tabColor};
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
  font-family: "Rubik_500Medium";
  text-transform: capitalize;
`;

const Caption = styled.Text<IsCaptionP>`
  font-size: 15px;
  color: ${(prop) => (prop.isCaption ? "black" : prop.theme.tabColor)};
`;

export default ({ word, words, index }: WordP) => {
  const { navigate } = useNavigation();

  return (
    <Container
      onPress={() => navigate("AllCards", { words, index })}
      style={{ elevation: 8 }}
    >
      <ContentContainer isName>
        <Name>{word.name}</Name>
      </ContentContainer>
      <ContentContainer>
        <Caption isCaption={word.caption}>
          {word.caption ? word.caption : "입력해주세요"}
        </Caption>
      </ContentContainer>
    </Container>
  );
};
