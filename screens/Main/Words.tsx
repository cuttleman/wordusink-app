import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Word from "../../components/Word";
import { PartialWord } from "../../types/interfaces";

export const ALL_WORDS = gql`
  {
    allWords {
      id
      name
      caption
      votes {
        id
      }
      image {
        id
        url
      }
    }
  }
`;

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
    fetchPolicy: "cache-and-network",
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

  const refresh = () => (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return loading ? (
    <Loading />
  ) : (
    <Container>
      {data?.allWords?.length === 0 ? (
        <Text>You have 0 word</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={refresh()}
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
