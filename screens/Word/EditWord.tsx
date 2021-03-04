import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TextInput, View, Text, TouchableOpacity } from "react-native";
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

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const { params }: EditWordParams = useRoute();
  const { navigate } = useNavigation();
  const [editWordMutation] = useMutation(EDIT_WORD);
  const name = useInput(params?.name);
  const caption = useInput(params?.caption);

  const clickHandle = async () => {
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
        navigate("Card", { firstTerm: name.value?.substring(0, 1) });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Image
        source={{ uri: params?.url }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput value={name.value} onChangeText={name.onChangeText} />
      <TextInput value={caption.value} onChangeText={caption.onChangeText} />
      <TouchableOpacity onPress={() => clickHandle()}>
        <Text>Done</Text>
      </TouchableOpacity>
    </Container>
  );
};
