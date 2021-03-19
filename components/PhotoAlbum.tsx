import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";

export default ({
  photos,
  selectPhoto,
  setSelectPhoto,
  onSrollBotReached,
  name,
  caption,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: selectPhoto }}
          style={{
            width: constants.width,
            height: constants.height / 2.5,
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
          onPress={() =>
            // Query
            console.log(selectPhoto, name, caption)
          }
        >
          <Text>test</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "black",
          flexDirection: "row",
          flexWrap: "wrap",
          width: constants.width,
        }}
        onScroll={({ nativeEvent }) => onSrollBotReached(nativeEvent)}
      >
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectPhoto(photo)}>
            <Image
              source={{ uri: photo }}
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
