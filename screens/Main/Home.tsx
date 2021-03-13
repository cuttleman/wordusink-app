import React, { useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import CardListH from "../../components/CardListH";
import { ALL_WORDS, HAVING_WORDS } from "../../queries";
import Loading from "../../components/Loading";
import CardListV from "../../components/CardListV";

const Container = styled.View`
  background-color: #786fa6;
`;

const Home: React.FC = () => {
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const {
    data: havingData,
    loading: havingLoading,
    refetch: havingRefetch,
  } = useQuery(HAVING_WORDS);
  const {
    data: allWordsData,
    loading: allWordsLoading,
    refetch: allWordsRefetch,
  } = useQuery(ALL_WORDS);

  return havingLoading && allWordsLoading ? (
    <Loading />
  ) : (
    <Container>
      <CardListH words={havingData?.havingWords} scrollEvent={scrollDown} />
      <CardListV
        words={allWordsData?.allWords}
        scrollEvent={{ value: scrollDown, set: setScrollDown }}
        refetches={{ having: havingRefetch, all: allWordsRefetch }}
      />
    </Container>
  );
};

export default Home;
