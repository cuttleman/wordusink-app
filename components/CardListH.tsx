import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import { CardListHP, WordTextSt } from "../types/interfaces";
import { colors } from "../utils";

const Container = styled(View)`
  width: ${constants.width}px;
  height: ${constants.height / 3.5}px;
  border-bottom-left-radius: 40px;
  background-color: #574b90;
  align-items: center;
  padding: 5px;
`;

const PreviewWord = styled(TouchableOpacity)`
  width: ${constants.width / 5}px;
  height: ${constants.height / 7}px;
  background-color: white;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const WordText = styled(Text)<WordTextSt>`
  color: ${(props) => `${colors[props.index]}`};
  font-size: 23px;
  font-weight: 700;
`;

export default ({ words }: CardListHP) => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <ScrollView
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
      >
        {words.length === 0 ? (
          <Text>단어를 추가해보세요</Text>
        ) : (
          words.map((word, idx) => (
            <PreviewWord
              key={idx}
              onPress={() => navigate("Cards", { firstTerm: word.name })}
            >
              <Text>{word.count}</Text>
              <WordText index={idx}>{word.name}</WordText>
            </PreviewWord>
          ))
        )}
      </ScrollView>
    </Container>
  );
};
