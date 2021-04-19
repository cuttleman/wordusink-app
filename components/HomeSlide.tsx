import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useQuery } from "@apollo/client";
import { ALL_IMAGES } from "../queries";
import constants from "../constants";
import Loading from "./Loading";
import theme from "../theme";

const Container = styled.View``;

const ItemContainer = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.tabColor};
`;

const ItemIamge = styled.Image`
  height: 250px;
`;

export default () => {
  const { data, loading } = useQuery(ALL_IMAGES, {
    fetchPolicy: "network-only",
  });

  return loading ? (
    <Loading />
  ) : (
    <ItemContainer>
      <Carousel
        data={data.allImages}
        renderItem={({ item }: { item: { id: string; url: string } }) => (
          <ItemIamge source={{ uri: item.url }} resizeMode={"contain"} />
        )}
        sliderWidth={constants.width / 1.2}
        itemWidth={constants.width / 1.2}
        autoplay={true}
        autoplayDelay={6000}
        loop={true}
      />
    </ItemContainer>
  );
};
