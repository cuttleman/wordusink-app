import React from "react";
import styled from "styled-components/native";
import {
  useNavigation,
  useRoute,
  StackActions,
  CommonActions,
} from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { Image, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import useInput from "../../hooks/useInput";
import { EditWordParams } from "../../types/interfaces";
import { DELETE_WORD, EDIT_WORD } from "../../queries";
import { engValidation } from "../../utils";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const { params }: EditWordParams = useRoute();
  const navigation = useNavigation();
  const [editWordMutation] = useMutation(EDIT_WORD);
  const [deleteWordMutation] = useMutation(DELETE_WORD);
  const name = useInput(params?.name);
  const caption = useInput(params?.caption);

  const doneHandle = async () => {
    try {
      if (name.value === "") {
        throw new Error("단어 이름을 적어주세요");
      } else if (caption.value !== undefined && caption.value.length > 8) {
        throw new Error("한글 뜻은 8자까지 입력할 수 있습니다.");
      } else if (
        name.value !== undefined &&
        engValidation(name.value) === false
      ) {
        throw new Error("단어는 띄어쓰기 없이 영어로 적어주세요");
      }
      const {
        data: { editWord: result },
      } = await editWordMutation({
        variables: {
          wordId: params?.wordId,
          name: name.value,
          caption: caption.value,
        },
      });
      if (result) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      }
    } catch (e) {
      Alert.alert("", e.message);
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
            routes: [{ name: "Home" }],
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const preDeleteHandle = () => {
    Alert.alert(
      "Really Delete one?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteHandle() },
      ],
      { cancelable: false }
    );
  };
  return (
    <Container>
      <Image
        source={{ uri: params?.url }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        value={name.value}
        onChangeText={name.onChangeText}
        autoCapitalize={"none"}
      />
      <TextInput
        value={caption.value}
        onChangeText={caption.onChangeText}
        autoCapitalize={"none"}
      />
      <TouchableOpacity onPress={() => doneHandle()}>
        <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => preDeleteHandle()}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </Container>
  );
};
