import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import CardListH from "../../components/CardListH";
import { ALL_WORDS, HAVING_WORDS } from "../../queries";
import CardListV from "../../components/CardListV";
import { useNavigation } from "@react-navigation/core";

const Container = styled.View`
  background-color: #786fa6;
`;

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const {
    data: havingData,
    loading: havingLoading,
    refetch: havingRefetch,
  } = useQuery(HAVING_WORDS, { fetchPolicy: "cache-and-network" });
  const {
    data: allWordsData,
    loading: allWordsLoading,
    refetch: allWordsRefetch,
  } = useQuery(ALL_WORDS, { fetchPolicy: "cache-and-network" });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <CardListH
        words={havingData?.havingWords}
        scrollEvent={scrollDown}
        loading={havingLoading}
      />
      <CardListV
        words={allWordsData?.allWords}
        scrollEvent={{ value: scrollDown, set: setScrollDown }}
        loading={allWordsLoading}
        refetches={{ having: havingRefetch, all: allWordsRefetch }}
      />
    </Container>
  );
};

export default Home;
