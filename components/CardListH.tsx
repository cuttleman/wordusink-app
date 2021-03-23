import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, Animated, Easing } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import { CardListHP, WordTextSt } from "../types/interfaces";
import { colors } from "../utils";
import Loading from "./Loading";

const Container = styled(Animated.View)`
  width: ${constants.width}px;
  border-bottom-left-radius: 40px;
  background-color: #574b90;
  align-items: center;
  padding: 20px;
  position: absolute;
  z-index: 998;
`;

const PreviewWord = styled.TouchableOpacity`
  width: ${constants.width / 5}px;
  background-color: white;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
`;

const WordText = styled(Animated.Text)<WordTextSt>`
  color: ${(props) => `${colors[props.index]}`};
  font-weight: 700;
  text-transform: uppercase;
`;

export default ({ words, scrollEvent, loading }: CardListHP) => {
  const { navigate } = useNavigation();
  const animation = new Animated.Value(scrollEvent ? 0 : 1);
  const textSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [23, 16],
  });
  const paddingVertical = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [25, 0],
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: scrollEvent ? 1 : 0,
      duration: 700,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start();
  }, [animation]);

  return (
    <Container>
      <ScrollView
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <Loading />
        ) : words.length === 0 ? (
          <Text>단어를 추가해보세요</Text>
        ) : (
          words.map((word, idx) => (
            <PreviewWord
              key={idx}
              onPress={() =>
                navigate("FirstCharCards", { firstTerm: word.name })
              }
            >
              <WordText
                index={idx}
                style={{ fontSize: textSize, paddingVertical }}
              >
                {word.name}
              </WordText>
            </PreviewWord>
          ))
        )}
      </ScrollView>
    </Container>
  );
};
