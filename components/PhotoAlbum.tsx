import { useMutation } from "@apollo/client";
import {
  useNavigation,
  TabActions,
  CommonActions,
  StackActions,
} from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import { CREATE_WORD } from "../queries";
import { PhotoAlbumP } from "../types/interfaces";

export default ({
  photos,
  selectPhoto,
  setSelectPhoto,
  onSrollBotReached,
  name,
  caption,
}: PhotoAlbumP) => {
  const [createWordMutation] = useMutation(CREATE_WORD);
  const navigation = useNavigation();

  const createWordHandle = async () => {
    try {
      const { data } = await createWordMutation({
        variables: {
          name,
          caption,
          url: selectPhoto,
        },
      });
      if (data?.createWord?.result) {
        // Will Change - regist 2021/3/21
        navigation.dispatch(StackActions.replace("Tab"));
      } else {
        throw Error(data?.createWord?.message);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("error", e.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: selectPhoto }}
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
          onPress={createWordHandle}
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
