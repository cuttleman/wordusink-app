import React, { useMemo } from "react";
import { Text } from "react-native";
import { useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { CarouselP, SpecificWordParamsP } from "../../types/interfaces";
import { SPECIFIC_WORDS } from "../../queries";
import constants from "../../constants";
import IssueImage from "../../components/IssueImage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const { params }: SpecificWordParamsP = useRoute();
  const { data, loading } = useQuery(SPECIFIC_WORDS, {
    fetchPolicy: "network-only",
    variables: { alphabet: params?.firstTerm?.toLowerCase() },
  });

  const renderItem = ({ item }: CarouselP) => (
    <Card key={item.id} word={item} />
  );

  const memoizedValue = useMemo(() => renderItem, [data?.specificWords]);

  return loading || data?.specificWords === undefined ? (
    <Loading />
  ) : (
    <Container>
      {data?.specificWords.length === 0 ? (
        <IssueImage type="empty" />
      ) : (
        <Carousel
          layout={"default"}
          data={data?.specificWords}
          sliderWidth={constants.width}
          itemWidth={constants.width}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.8}
          initialNumToRender={1}
          renderItem={memoizedValue}
        />
      )}
    </Container>
  );
};
