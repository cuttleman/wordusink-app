import React from "react";
import { Text, View } from "react-native";
import { CardListVP, PartialWord } from "../types/interfaces";
import Loading from "./Loading";
import Word from "./Word";

export default ({ words, loading }: CardListVP) => {
  return (
    <View>
      {loading ? (
        <Loading />
      ) : words?.length === 0 ? (
        <Text>You have 0 word</Text>
      ) : (
        words?.map((word: PartialWord, index: number) => (
          <Word key={word.id} word={word} words={words} index={index} />
        ))
      )}
    </View>
  );
};
