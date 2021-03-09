import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Word from "../../components/Word";
import { PartialWord } from "../../types/interfaces";
import { ALL_WORDS } from "../../queries";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #786fa6;
  padding: 5px 0;
`;

const Words: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, refetch, loading } = useQuery(ALL_WORDS, {
    variables: { isSort: false },
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      {data?.allWords?.length === 0 ? (
        <Text>You have 0 word</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data?.allWords?.map((word: PartialWord) => (
            <Word key={word.id} word={word} words={data?.allWords} />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};

export default Words;
