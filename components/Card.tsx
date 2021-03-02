import React, { useState } from "react";
import { Image, View, Pressable, Text, Animated } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import { WordP } from "../types/interfaces";

const Container = styled(View)`
  width: ${constants.width}px;
  align-items: center;
  background-color: white;
`;

const PhotoContainer = styled(View)`
  width: ${constants.width}px;
  height: ${constants.height / 1.5}px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const Photo = styled(Image)`
  width: ${constants.width / 1.2}px;
  height: ${constants.width / 1.2}px;
  border-radius: 15px;
`;

const BoldText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
`;

const CaptionContainer = styled(View)`
  width: ${constants.width}px;
  height: ${constants.height}px;
  background-color: #786fa6;
  padding: 30px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  position: relative;
`;

const NameContainer = styled(Pressable)`
  position: relative;
  top: -60px;
  width: ${constants.width / 2}px;
  align-self: center;
`;

const NameBox = styled(Animated.View)`
  width: ${constants.width / 2}px;
  background-color: white;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 2px dotted #3d3d3d;
  padding: 30px 0;
`;

const Name = styled(Animated.View)`
  position: absolute;
  background-color: white;
  width: ${constants.width / 2.2}px;
  align-items: center;
`;

const NameB = styled(Name)`
  transform: rotateY(180deg);
`;

export default ({ word }: WordP) => {
  let turn = false;

  const animation = new Animated.Value(0);

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

  const NameBZIndexing = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 3],
  });

  const toggleTurn = () => {
    turn = !turn;
    if (turn) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }).start();
      }, 1000);
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Container>
      <PhotoContainer>
        <Photo source={{ uri: word.image.url }} resizeMode="contain" />
      </PhotoContainer>
      <CaptionContainer>
        <NameContainer onPress={toggleTurn}>
          <NameBox
            style={{
              transform: [
                { rotateY: turnning },
                { perspective: perspectiving },
              ],
            }}
          >
            <Name style={{ zIndex: NameZIndexing }}>
              <BoldText>{word.name}</BoldText>
            </Name>
            <NameB style={{ zIndex: NameBZIndexing }}>
              <BoldText>{word.caption}</BoldText>
            </NameB>
          </NameBox>
        </NameContainer>
      </CaptionContainer>
    </Container>
  );
};
