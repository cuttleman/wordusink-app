import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import { PhotoAlbumP, photoPInAlbum } from "../types/interfaces";

export default ({
  photos,
  selectPhoto,
  selectPhotoAction,
  onSrollBotReached,
  createWordAction,
}: PhotoAlbumP) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri:
              typeof selectPhoto === "string" ? selectPhoto : selectPhoto.uri,
          }}
          resizeMode={"contain"}
          style={{
            flex: 1,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            backgroundColor: "white",
            padding: 10,
            right: 10,
            top: 10,
          }}
          onPress={createWordAction}
        >
          <Text>test</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: constants.width,
        }}
        onScroll={({ nativeEvent }) => onSrollBotReached(nativeEvent)}
      >
        {photos.map((photo: photoPInAlbum, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectPhotoAction(photo)}
          >
            <Image
              source={{
                uri: typeof photo === "string" ? photo : photo.uri,
              }}
              style={{
                width: constants.width / 3,
                height: constants.height / 6,
                opacity: selectPhoto === photo ? 0.4 : 1,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
