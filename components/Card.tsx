import React from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import constants from "../constants";
import useTurn from "../hooks/useTurn";
import { CardNameSt, WordP } from "../types/interfaces";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.View`
  width: ${constants.width / 1.1}px;
  height: ${constants.height / 1.4}px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  background-color: ${(prop) => prop.theme.colors.mainColor};
`;

const PhotoContainer = styled.View`
  width: ${constants.width / 1.3}px;
  height: ${constants.height / 2.3}px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Photo = styled.Image`
  width: ${constants.width / 1.4}px;
  height: ${constants.width / 1.4}px;
  border-radius: 4px;
`;

const BoldText = styled.Text<CardNameSt>`
  font-size: 20px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  ${(props) => props.isName && "text-transform: capitalize;"};
`;

const NameContainer = styled.Pressable`
  width: ${constants.width / 2}px;
`;

const NameBox = styled(Animated.View)`
  width: ${constants.width / 2}px;
  height: 50px;
  background-color: white;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border-width: 1px;
  border-color: black;
  padding: 25px 0;
  overflow: hidden;
`;

const Name = styled(Animated.View)`
  position: absolute;
  background-color: white;
  width: ${constants.width / 2.2}px;
  height: 50px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Caption = styled(Name)`
  transform: rotateY(180deg);
  z-index: 2;
`;

const EditContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  border-top-left-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: ${(prop) => prop.theme.colors.liteMainColor};
`;

const EditBtn = styled.TouchableOpacity`
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

export default ({ word }: WordP) => {
  const { toggleTurn, turnning, perspectiving, NameZIndexing } = useTurn();
  const { navigate } = useNavigation();

  return (
    <Container>
      <CardContainer
        style={{
          elevation: 10,
        }}
      >
        <PhotoContainer>
          <Photo source={{ uri: word.image.url }} resizeMode="contain" />
        </PhotoContainer>
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
              <BoldText isName>{word.name}</BoldText>
            </Name>
            <Caption>
              <BoldText>{word.caption}</BoldText>
            </Caption>
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
            <Ionicons name={"create"} color={"white"} size={25} />
          </EditBtn>
        </EditContainer>
      </CardContainer>
    </Container>
  );
};
