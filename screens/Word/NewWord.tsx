import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Alert, Button, Text, TouchableOpacity } from "react-native";
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
          <NextText>dfadf</NextText>
        </NextBtn>
      ),
    });
  });

  return <New name={name} caption={caption} />;
};
