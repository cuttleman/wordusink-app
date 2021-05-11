import React, { useLayoutEffect, useMemo } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import Card from "../../components/Card";
import { AllWordsParamsP, CarouselP } from "../../types/interfaces";
import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.bgColor};
`;

export default () => {
  const { params }: AllWordsParamsP = useRoute();

  const renderItem = ({ item }: CarouselP) => (
    <Card key={item.id} word={item} />
  );

  const memoizedValue = useMemo(() => renderItem, [params?.words]);

  return (
    <Container>
      {params?.words?.length === 0 ||
      params?.words === undefined ||
      params?.index === undefined ? (
        <Text>Nothing</Text>
      ) : (
        <Carousel
          layout={"default"}
          data={params.words}
          firstItem={params.index}
          sliderWidth={constants.width}
          itemWidth={constants.width}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.8}
          initialNumToRender={params?.words?.length}
          renderItem={memoizedValue}
        />
      )}
    </Container>
  );
};
