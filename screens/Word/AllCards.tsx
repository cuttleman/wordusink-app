import React from "react";
import { Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import Card from "../../components/Card";
import { AllWordsParamsP, PartialWord } from "../../types/interfaces";
import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #786fa6;
`;

export default () => {
  const { params }: AllWordsParamsP = useRoute();

  const findIndex: number | undefined = params?.words?.findIndex(
    (word: PartialWord) => word.id === params?.wordId
  );
  const getWords: PartialWord[] | undefined = params?.words;
  return (
    <Container>
      {params?.words?.length === 0 ||
      findIndex === undefined ||
      getWords === undefined ? (
        <Text>Nothing</Text>
      ) : (
        <Carousel
          layout={"default"}
          data={getWords}
          firstItem={findIndex}
          sliderWidth={constants.width}
          itemWidth={constants.width}
          renderItem={({ item }: { item: PartialWord }) => (
            <Card
              key={item.id}
              word={item}
              index={findIndex}
              total={params?.words?.length}
            />
          )}
        />
      )}
    </Container>
  );
};
