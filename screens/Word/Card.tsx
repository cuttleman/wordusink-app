import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { ParamsP } from "../../types/interfaces";

const SPECIFIC_WORDS = gql`
  query specificWords($alphabet: String!) {
    specificWords(alphabet: $alphabet) {
      id
      name
      caption
      image {
        url
      }
      votes {
        id
        author {
          userName
          email
        }
      }
    }
  }
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Cards: React.FC = () => {
  const { params }: ParamsP = useRoute();
  const [loading, setLoading] = useState<boolean>(true);

  const { data, refetch } = useQuery(SPECIFIC_WORDS, {
    variables: { alphabet: params?.firstTerm?.toLowerCase() },
  });

  const getData = () => {
    refetch();
    setLoading(false);
  };

  useEffect(() => {
    getData();
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
