import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import { PhotoAlbumP, PhotoItemSt, photoPInAlbum } from "../types/interfaces";

const Container = styled.View`
  flex: 1;
`;

const Selected = styled(Container)``;

const Preview = styled.Image`
  flex: 1;
`;

const DoneBtn = styled.TouchableOpacity`
  position: absolute;
  background-color: white;
  padding: 10px 10px 10px 16px;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${(prop) => prop.theme.colors.mainColor};
`;

const DoneText = styled.Text`
  color: white;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  font-size: 15px;
`;

const PhotoList = styled.ScrollView`
  flex: 1;
`;

const PhotoContainer = styled.TouchableOpacity``;

const PhotoItem = styled.Image<PhotoItemSt>`
  width: ${constants.width / 3}px;
  height: ${constants.height / 6}px;
  opacity: ${(prop) => (prop.selectPhoto === prop.photo ? 0.4 : 1)};
`;

export default ({
  photos,
  selectPhoto,
  selectPhotoAction,
  onSrollBotReached,
  doneAction,
}: PhotoAlbumP) => {
  return (
    <Container style={{ flex: 1 }}>
      <Selected style={{ flex: 1 }}>
        <Preview
          source={{
            uri:
              typeof selectPhoto === "string" ? selectPhoto : selectPhoto.uri,
          }}
          resizeMode={"contain"}
          style={{
            flex: 1,
          }}
        />
        <DoneBtn onPress={doneAction}>
          <DoneText>등록</DoneText>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            color={"white"}
            size={18}
          />
        </DoneBtn>
      </Selected>
      <PhotoList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: constants.width,
        }}
        onScroll={({ nativeEvent }) => onSrollBotReached(nativeEvent)}
      >
        {photos.map((photo: photoPInAlbum, index: number) => (
          <PhotoContainer key={index} onPress={() => selectPhotoAction(photo)}>
            <PhotoItem
              source={{
                uri: typeof photo === "string" ? photo : photo.uri,
              }}
              selectPhoto={selectPhoto}
              photo={photo}
            />
          </PhotoContainer>
        ))}
      </PhotoList>
    </Container>
  );
};
