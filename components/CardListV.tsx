import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  Text,
} from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import { CardListVP, PartialWord } from "../types/interfaces";
import Loading from "./Loading";
import Word from "./Word";

const ScrollContainer = styled.ScrollView`
  width: ${constants.width}px;
  height: ${constants.height}px;
  background-color: #786fa6;
  padding-top: 150px;
`;

const Footer = styled.View`
  height: ${constants.height / 2.4}px;
`;

export default ({ words, scrollEvent, refetches, loading }: CardListVP) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      refetches.having();
      refetches.all();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: { y: scrollY },
        velocity,
      },
    } = event;

    if (velocity !== undefined) {
      if (!scrollEvent.value) {
        if (velocity.y >= 0 && Math.floor(scrollY) > 30) {
          scrollEvent.set(true);
        }
      } else {
        if (velocity.y < 0 && Math.floor(scrollY) < 60) {
          scrollEvent.set(false);
        }
      }
    }
  };

  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={150}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
      onScroll={onScroll}
    >
      {loading ? (
        <Loading />
      ) : words?.length === 0 ? (
        <Text>You have 0 word</Text>
      ) : (
        words?.map((word: PartialWord, index: number) => (
          <Word key={word.id} word={word} words={words} index={index} />
        ))
      )}
      <Footer></Footer>
    </ScrollContainer>
  );
};
