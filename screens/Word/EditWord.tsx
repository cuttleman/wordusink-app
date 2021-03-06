import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { EditWordParams } from "../../types/interfaces";
import { gql, useMutation } from "@apollo/client";

const EDIT_WORD = gql`
  mutation editWord(
    $wordId: String!
    $name: String
    $caption: String
    $url: String
  ) {
    editWord(wordId: $wordId, name: $name, caption: $caption, url: $url)
  }
`;

const DELETE_WORD = gql`
  mutation deleteWord($wordId: String!) {
    deleteWord(wordId: $wordId)
  }
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const { params }: EditWordParams = useRoute();
  const { navigate } = useNavigation();
  const [editWordMutation] = useMutation(EDIT_WORD);
  const [deleteWordMutation] = useMutation(DELETE_WORD);
  const name = useInput(params?.name);
  const caption = useInput(params?.caption);

  const editHandle = async () => {
    try {
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
        navigate("Cards", {
          firstTerm: name.value?.substring(0, 1).toLowerCase(),
        });
      }
    } catch (e) {
      console.log(e);
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
        navigate("Home");
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
      <TouchableOpacity onPress={() => editHandle()}>
        <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => preDeleteHandle()}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </Container>
  );
};
