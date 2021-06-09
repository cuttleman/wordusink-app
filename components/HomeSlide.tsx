import React, { useMemo } from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import constants from "../constants";
import Loading from "./Loading";
import { HomeSlideP } from "../types/interfaces";

const ItemContainer = styled.View`
  padding: 10px;
  height: 230px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.colors.tabColor};
`;

export default ({ images, loading }: HomeSlideP) => {
  const renderItem = ({ item }: { item: { id: string; url: string } }) => (
    <Image
      source={{ uri: item.url }}
      resizeMode={"contain"}
      style={{ flex: 1, borderRadius: 5 }}
    />
  );

  const memoizedValue = useMemo(() => renderItem, [images]);

  return loading || images === undefined ? (
    <Loading />
  ) : (
    <ItemContainer>
      <Carousel
        layout={"default"}
        data={images}
        firstItem={0}
        initialNumToRender={1}
        sliderWidth={constants.width / 1.2}
        itemWidth={constants.width / 1.2}
        autoplay={true}
        loop={true}
        autoplayInterval={2000}
        loopClonesPerSide={images.length}
        renderItem={memoizedValue}
      />
    </ItemContainer>
  );
};
