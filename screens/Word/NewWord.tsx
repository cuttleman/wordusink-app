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
import { inputValidation } from "../../utils";

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
              inputValidation(name.value, caption.value);
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
