import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Animated, RefreshControl } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "./Avatar";
import useSlide from "../hooks/useSlide";
import UserOptions from "./UserOptions";
import { UserP } from "../types/interfaces";
import constants from "../constants";

const Container = styled.ScrollView`
  width: ${constants.width}px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  padding-top: 30px;
`;

const Header = styled.View`
  height: 60px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.colors.tabColor};
`;

const UserName = styled(Animated.Text)`
  font-size: 25px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

const Options = styled.TouchableOpacity``;

const AvatarContainer = styled.View`
  margin-bottom: 30px;
`;

const HavingContainer = styled.View`
  width: ${constants.width}px;
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: center;
`;

const HavingWords = styled.View`
  align-items: center;
  margin: 0 10px;
`;

const Title = styled.Text`
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  font-size: 17px;
`;

const Number = styled.Text`
  font-family: ${(prop) => prop.theme.fontFamily.rubik400};
  margin-top: 10px;
  font-size: 15px;
`;

const MyImagesContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`;

const ImageBtn = styled.View<{ index: number }>`
  width: ${constants.width / 2}px;
  height: ${constants.width / 2}px;
  border-color: white;
  border-bottom-width: 1px;
  border-right-width: ${(prop) => (prop.index % 2 === 0 ? 1 : 0)}px;
  overflow: hidden;
`;

const MyImage = styled.Image`
  width: ${constants.width / 2}px;
  height: ${constants.width / 2}px;
`;

export default ({ refreshing, onRefresh, self }: UserP) => {
  const { toggleOpen, sliding, smalling } = useSlide();

  return (
    <>
      <Header style={{ elevation: 5 }}>
        <UserName style={{ fontSize: smalling }}>{self.userName}</UserName>
        <Options onPress={toggleOpen}>
          <AntDesign name={"menufold"} size={24} />
        </Options>
        <UserOptions
          animation={sliding}
          toggleFunc={toggleOpen}
          userInfo={self}
        />
      </Header>
      <Container
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AvatarContainer>
          <Avatar avatar={self?.avatar} size={"lg"} />
        </AvatarContainer>
        <HavingContainer>
          <HavingWords>
            <Title>총 단어 수</Title>
            <Number>{self?.images?.length}</Number>
          </HavingWords>
          <HavingWords>
            <Title>오늘 추가한 단어 수</Title>
            <Number>{self?.onTodayWords?.length}</Number>
          </HavingWords>
        </HavingContainer>
        <MyImagesContainer>
          {self?.images?.map((image, idx) => (
            <ImageBtn key={image.id} index={idx}>
              <MyImage source={{ uri: image.url }} resizeMode={"cover"} />
            </ImageBtn>
          ))}
        </MyImagesContainer>
      </Container>
    </>
  );
};
