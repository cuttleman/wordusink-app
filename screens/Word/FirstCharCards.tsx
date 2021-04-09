import React, { useLayoutEffect } from "react";
import { Text } from "react-native";
import { useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { PartialWord, SpecificWordParamsP } from "../../types/interfaces";
import { SPECIFIC_WORDS } from "../../queries";
import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FirstCharCards: React.FC = () => {
  const { params }: SpecificWordParamsP = useRoute();
  const { data, loading } = useQuery(SPECIFIC_WORDS, {
    fetchPolicy: "network-only",
    variables: { alphabet: params?.firstTerm?.toLowerCase() },
  });

  const getWords: PartialWord[] | undefined = data?.specificWords;

  return loading || getWords === undefined ? (
    <Loading />
  ) : (
    <Container>
      {getWords.length === 0 ? (
        <Text>Nothing</Text>
      ) : (
        <Carousel
          layout={"default"}
          data={getWords}
          sliderWidth={constants.width}
          itemWidth={constants.width}
          renderItem={({
            item,
            index,
          }: {
            item: PartialWord;
            index: number;
          }) => (
            <Card
              key={item.id}
              word={item}
              index={index}
              total={getWords.length}
            />
          )}
        />
      )}
    </Container>
  );
};

export default FirstCharCards;
