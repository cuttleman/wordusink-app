import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Alert } from "react-native";
import New, { NextBtn, NextText } from "../../components/New";
import useInput from "../../hooks/useInput";
import { inputValidation } from "../../utils";

export default () => {
  const navigation = useNavigation();
  const name = useInput("");
  const caption = useInput("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextBtn
          onPress={() => {
            try {
              inputValidation(name.value, caption.value);
              navigation.navigate("SelectPhoto", {
                name: name.value,
                caption: caption.value,
              });
            } catch (e) {
              Alert.alert("", e.message);
            }
          }}
        >
          <NextText>Pick Image</NextText>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            color={"white"}
            size={18}
          />
        </NextBtn>
      ),
    });
  });

  return <New name={name} caption={caption} />;
};
