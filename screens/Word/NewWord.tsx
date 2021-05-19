import React, { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { PublisherBanner } from "expo-ads-admob";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SectionTitle from "../../components/SectionTitle";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import theme from "../../theme";
import { exampleGenerator, globalNotifi, inputValidator } from "../../utils";

const Container = styled.View`
  flex: 1;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  justify-content: space-between;
`;

const InputContainer = styled.View`
  align-items: center;
  padding: 30px;
`;

const TextInputS = styled.TextInput`
  width: ${constants.width / 1.5}px;
  background-color: white;
  padding: 10px 15px;
  border-width: 0px;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px; ;
`;

const AdsContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: ${constants.height / 10}px;
`;

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
  const inputName = useInput("");
  const inputCaption = useInput("");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextBtn
          onPress={async () => {
            try {
              if (inputName.value !== undefined) {
                inputValidator(inputName.value, inputCaption.value);
                const examples = await exampleGenerator(inputName.value);
                navigation.navigate("SelectPhoto", {
                  name: inputName.value,
                  caption: inputCaption.value,
                  examples,
                });
              }
            } catch (e) {
              globalNotifi("error", e.message);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <InputContainer>
          <SectionTitle text={"단어 이름 ( 예> apple ) *"} />
          <TextInputS
            style={{ elevation: 8 }}
            selectionColor={theme.colors.liteMainColor}
            value={inputName.value}
            onChangeText={inputName.onChangeText}
            autoCapitalize={"none"}
            maxLength={22}
            placeholder={"이름"}
          />
          <SectionTitle text={"단어 의미 ( 예> 사과 )"} />
          <TextInputS
            style={{ elevation: 8 }}
            selectionColor={theme.colors.liteMainColor}
            value={inputCaption.value}
            onChangeText={inputCaption.onChangeText}
            autoCapitalize={"none"}
            maxLength={8}
            placeholder={"의미 (8글자)"}
          />
        </InputContainer>
        <AdsContainer>
          {/* <PublisherBanner
            bannerSize="mediumRectangle"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          /> */}
        </AdsContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
