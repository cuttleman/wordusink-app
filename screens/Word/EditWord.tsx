import React from "react";
import {
  useNavigation,
  useRoute,
  CommonActions,
  useNavigationState,
} from "@react-navigation/native";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { useMutation } from "@apollo/client";
import useInput from "../../hooks/useInput";
import { DELETE_WORD, EDIT_WORD } from "../../queries";
import { exampleGenerator, globalNotifi, inputValidator } from "../../utils";
import { EditBtnSt, EditWordParams } from "../../types/interfaces";
import constants from "../../constants";
import theme from "../../theme";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.View`
  width: ${constants.width / 1.1}px;
  height: ${constants.height / 1.4}px;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;
  background-color: ${(prop) => prop.theme.colors.mainColor};
`;

const ContentsContainer = styled.View`
  align-items: center;
`;

const PhotoContainer = styled.View`
  width: ${constants.width / 1.4}px;
  height: ${constants.height / 2.6}px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ImagePreview = styled.Image`
  width: ${constants.width / 1.7}px;
  height: ${constants.width / 1.7}px;
  border-radius: 4px;
`;

const InputContainer = styled.View``;

const TextInputS = styled.TextInput`
  width: ${constants.width / 1.8}px;
  height: 40px;
  text-align: center;
  margin-bottom: 10px;
  background-color: white;
  font-size: 17px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  border-radius: 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity<EditBtnSt>`
  width: ${constants.width / 3}px;
  height: 40px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(prop) =>
    prop.isDone ? prop.theme.colors.doneColor : prop.theme.colors.deleteColor};
`;

const BtnText = styled.Text`
  color: white;
  font-family: "Rubik_500Medium";
  font-size: 19px;
`;

export default () => {
  const { params }: EditWordParams = useRoute();
  const navigation = useNavigation();
  const routesHistory: string[] = useNavigationState(
    (state) => state.routeNames
  );
  const [editWordMutation] = useMutation(EDIT_WORD);
  const [deleteWordMutation] = useMutation(DELETE_WORD);
  const inputName = useInput(params?.name);
  const inputCaption = useInput(params?.caption);

  const doneHandle = async () => {
    try {
      if (inputName.value !== undefined) {
        inputValidator(inputName?.value, inputCaption?.value);
        const examples = await exampleGenerator(inputName.value);
        const {
          data: { editWord: result },
        } = await editWordMutation({
          variables: {
            wordId: params?.wordId,
            name: inputName.value,
            caption: inputCaption.value,
            examples,
          },
        });
        if (result) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: routesHistory[0] },
                { name: routesHistory[0] === "Words" ? "Home" : "Words" },
              ],
            })
          );
          globalNotifi("success", "단어가 수정되었습니다.😊");
        }
      }
    } catch (e) {
      globalNotifi("error", e.message);
    }
  };

  const deleteHandle = async () => {
    try {
      const {
        data: { deleteWord: result },
      } = await deleteWordMutation({
        variables: { wordId: params?.wordId },
      });
      if (result) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: routesHistory[0] },
              { name: routesHistory[0] === "Words" ? "Home" : "Words" },
            ],
          })
        );
        globalNotifi("success", "단어가 삭제되었습니다.😞");
      }
    } catch (e) {
      globalNotifi("error", e.message);
    }
  };

  const preDeleteHandle = () => {
    Alert.alert(
      `\'${inputName.value}\' 를 정말 지우시겠습니까?`,
      "",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        { text: "예", onPress: () => deleteHandle() },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <CardContainer style={{ elevation: 8 }}>
          <ContentsContainer>
            <PhotoContainer>
              <ImagePreview
                source={{ uri: params?.url }}
                resizeMode={"contain"}
              />
            </PhotoContainer>
            <InputContainer>
              <TextInputS
                selectionColor={theme.colors.liteMainColor}
                value={inputName.value}
                onChangeText={inputName.onChangeText}
                autoCapitalize={"none"}
                maxLength={22}
                placeholder={"이름"}
              />
              <TextInputS
                selectionColor={theme.colors.liteMainColor}
                value={inputCaption.value}
                onChangeText={inputCaption.onChangeText}
                autoCapitalize={"none"}
                maxLength={8}
                placeholder={"의미 (8글자)"}
              />
            </InputContainer>
          </ContentsContainer>
          <BtnContainer>
            <Button onPress={preDeleteHandle}>
              <BtnText>지우기</BtnText>
            </Button>
            <Button onPress={doneHandle} isDone>
              <BtnText>수정</BtnText>
            </Button>
          </BtnContainer>
        </CardContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
