import React, { useEffect, useState } from "react";
import { Image, View, Pressable, Text, Animated } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import { WordP } from "../types/interfaces";

const Container = styled(View)`
  width: ${constants.width}px;
  align-items: center;
  padding-top: ${constants.height / 13}px;
  background-color: #786fa6;
`;

const PhotoContainer = styled(View)`
  width: ${constants.width / 1.1}px;
  height: ${constants.height / 1.8}px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const Photo = styled(Image)`
  width: ${constants.width / 1.4}px;
  height: ${constants.width / 1.4}px;
  border-radius: 15px;
`;

const BoldText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
`;

const NameContainer = styled(Pressable)`
  position: absolute;
  width: ${constants.width / 2}px;
  align-self: center;
  top: ${constants.height / 1.7}px;
  z-index: 3;
`;

const NameBox = styled(Animated.View)`
  width: ${constants.width / 2}px;
  background-color: white;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid #3d3d3d;
  padding: 25px 0;
`;

const Name = styled(Animated.View)`
  position: absolute;
  background-color: white;
  width: ${constants.width / 2.2}px;
  align-items: center;
`;

const NameB = styled(Name)`
  transform: rotateY(180deg);
  z-index: 2;
`;

const EditContainer = styled(View)`
  width: ${constants.width}px;
  background-color: #786fa6;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export default ({ word, index, total }: WordP) => {
  const [turn, setTurn] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<number>(0);
  const animation = isInit
    ? new Animated.Value(turn ? 0 : 1)
    : new Animated.Value(0);
  const turnning = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
  });

  const perspectiving = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [700, 10, 700],
  });

  const NameZIndexing = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 2],
  });

  const toggleTurn = () => {
    setTurn((prev) => !prev);
    if (!isInit) {
      setIsInit(1);
    }
  };

  useEffect(() => {
    if (isInit) {
      Animated.timing(animation, {
        toValue: turn ? 1 : 0,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [turn]);

  return (
    <Container>
      <PhotoContainer>
        <Photo source={{ uri: word.image.url }} resizeMode="contain" />
      </PhotoContainer>
      <NameContainer onPress={() => toggleTurn()}>
        <NameBox
          style={{
            transform: [{ rotateY: turnning }, { perspective: perspectiving }],
          }}
        >
          <Name style={{ zIndex: NameZIndexing }}>
            <BoldText>{word.name}</BoldText>
          </Name>
          <NameB>
            <BoldText>{word.caption}</BoldText>
          </NameB>
        </NameBox>
      </NameContainer>
      <EditContainer></EditContainer>
    </Container>
  );
};
