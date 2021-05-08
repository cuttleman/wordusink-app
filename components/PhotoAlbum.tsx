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
  padding: 10px;
  right: 10px;
  top: 10px;
`;

const DoneText = styled.Text``;

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
          <DoneText>test</DoneText>
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
