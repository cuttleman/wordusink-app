import React, { useLayoutEffect } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled from "styled-components/native";
import Card from "../../components/Card";
import { AllWordsParamsP, PartialWord } from "../../types/interfaces";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Cards: React.FC = () => {
  const { params }: AllWordsParamsP = useRoute();

  return (
    <Container>
      {params?.words?.length === 0 ? (
        <Text>Nothing</Text>
      ) : (
        <SwiperFlatList
          data={params?.words}
          index={params?.words?.findIndex(
            (word: PartialWord) => word.id === params?.wordId
          )}
          renderItem={({ item, index }) => (
            <Card
              key={item.id}
              word={item}
              index={index}
              total={params?.words?.length}
            />
          )}
        />
      )}
    </Container>
  );
};

export default Cards;
