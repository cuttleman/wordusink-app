import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Pressable,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import constants from "../constants";
import useTurn from "../hooks/useTurn";
import { CardNameStyle, WordP } from "../types/interfaces";

const Container = styled(View)`
  width: ${constants.width}px;
  height: ${constants.height}px;
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
  border-radius: 10px;
`;

const BoldText = styled(Text)<CardNameStyle>`
  font-size: 20px;
  font-weight: 700;
  ${(props) => props.isName && "text-transform: capitalize;"}
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
  align-items: center;
`;

const EditBtn = styled(TouchableOpacity)`
  margin-top: 40px;
  width: 100px;
  height: 40px;
  background-color: #63cdda;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export default ({ word, index, total }: WordP) => {
  const { toggleTurn, turnning, perspectiving, NameZIndexing } = useTurn();
  const { navigate } = useNavigation();

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
            <BoldText isName>{word.name}</BoldText>
          </Name>
          <NameB>
            <BoldText>{word.caption}</BoldText>
          </NameB>
        </NameBox>
      </NameContainer>
      <EditContainer>
        <EditBtn
          onPress={() =>
            navigate("EditWord", {
              wordId: word.id,
              name: word.name,
              caption: word.caption,
              url: word.image.url,
            })
          }
        >
          <BoldText>Edit</BoldText>
        </EditBtn>
      </EditContainer>
    </Container>
  );
};
