import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, Image } from "react-native";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { SwiperFlatList } from "react-native-swiper-flatlist";
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
      <SwiperFlatList
        data={data?.specificWords}
        renderItem={({ item }) => <Card key={item.id} word={item} />}
      />
    </Container>
  );
};

export default Cards;
