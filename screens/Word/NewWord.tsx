import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useLayoutEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import New from "../../components/New";
import useInput from "../../hooks/useInput";
import { exampleGenerator, inputValidator } from "../../utils";

const NextBtn = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 15px;
  margin-right: 15px;
  background-color: ${(prop) => prop.theme.colors.mainColor};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NextText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

export default () => {
  const navigation = useNavigation();
  const name = useInput("");
  const caption = useInput("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextBtn
          onPress={async () => {
            try {
              if (name.value) {
                inputValidator(name.value, caption.value);
                const examples = await exampleGenerator(name.value);
                navigation.navigate("SelectPhoto", {
                  name: name.value,
                  caption: caption.value,
                  examples,
                });
              }
            } catch (e) {
              Alert.alert("", e.message);
            }
          }}
        >
          <NextText>이미지 선택</NextText>
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
