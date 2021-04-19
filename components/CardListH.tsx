import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, Animated, Easing } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import { CardListHP } from "../types/interfaces";
import Loading from "./Loading";

const Container = styled(Animated.View)`
  width: ${constants.width}px;
  background-color: ${(prop) => prop.theme.bgColor};
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.tabColor};
  align-items: center;
  padding: 20px;
  position: absolute;
  z-index: 998;
`;

const PreviewWordContainer = styled(Animated.View)`
  border-width: 2px;
  border-color: ${(prop) => prop.theme.mainColor};
  margin: 0 5px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const PreviewWord = styled.TouchableOpacity``;

const WordText = styled(Animated.Text)`
  font-family: "Rubik_500Medium";
  color: black;
  padding-horizontal: 25px;
  font-size: 18px;
  text-transform: uppercase;
`;

export default ({ words, scrollEvent, loading }: CardListHP) => {
  const { navigate } = useNavigation();
  const animation = new Animated.Value(scrollEvent ? 0 : 1);

  const textPadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 5],
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
            <PreviewWordContainer key={idx}>
              <PreviewWord
                onPress={() =>
                  navigate("FirstCharCards", { firstTerm: word.name })
                }
              >
                <WordText style={{ paddingVertical: textPadding }}>
                  {word.name}
                </WordText>
              </PreviewWord>
            </PreviewWordContainer>
          ))
        )}
      </ScrollView>
    </Container>
  );
};
