import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import { engValidation } from "../../utils";

export default () => {
  const navigation = useNavigation();
  const name = useInput("");
  const caption = useInput("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title=""
          onPress={() => {
            try {
              if (name.value === "") {
                throw new Error("영어이름을 적어주세요.");
              } else if (
                caption.value !== undefined &&
                caption.value.length > 8
              ) {
                throw new Error("한글 뜻은 8자까지 입력할 수 있습니다.");
              } else if (
                name.value !== undefined &&
                engValidation(name.value) === false
              ) {
                throw new Error("단어는 띄어쓰기 없이 영어로 적어주세요.");
              }
              navigation.navigate("SelectPhoto", {
                name: name.value,
                caption: caption.value,
              });
            } catch (e) {
              Alert.alert("", e.message);
            }
          }}
        />
      ),
    });
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{
            height: 30,
            width: constants.width / 2,
            borderColor: "black",
            borderWidth: 1,
          }}
          value={name.value}
          onChangeText={name.onChangeText}
        />
        <TextInput
          style={{
            height: 30,
            width: constants.width / 2,
            borderColor: "black",
            borderWidth: 1,
          }}
          value={caption.value}
          onChangeText={caption.onChangeText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
