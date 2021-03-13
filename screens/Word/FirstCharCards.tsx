import React from "react";
import { Text } from "react-native";
import { useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled from "styled-components/native";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { SpecificWordParamsP } from "../../types/interfaces";
import { SPECIFIC_WORDS } from "../../queries";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Cards: React.FC = () => {
  const { params }: SpecificWordParamsP = useRoute();
  const { data, loading } = useQuery(SPECIFIC_WORDS, {
    fetchPolicy: "cache-and-network",
    variables: { alphabet: params?.firstTerm?.toLowerCase() },
  });

  return loading ? (
    <Loading />
  ) : (
    <Container>
      {data?.specificWords?.length === 0 ? (
        <Text>Nothing</Text>
      ) : (
        <SwiperFlatList
          data={data?.specificWords}
          renderItem={({ item, index }) => (
            <Card
              key={item.id}
              word={item}
              index={index}
              total={data?.specificWords.length}
            />
          )}
        />
      )}
    </Container>
  );
};

export default Cards;
