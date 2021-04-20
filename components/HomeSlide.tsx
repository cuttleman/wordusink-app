import React from "react";
import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel";
import { useQuery } from "@apollo/client";
import { ALL_IMAGES } from "../queries";
import constants from "../constants";
import Loading from "./Loading";

const ItemContainer = styled.View`
  padding: 10px;
  height: 230px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.tabColor};
`;

const ItemIamge = styled.Image`
  flex: 1;
`;

export default () => {
  const { data, loading } = useQuery(ALL_IMAGES, {
    fetchPolicy: "network-only",
  });

  return loading || data.allImages === undefined ? (
    <Loading />
  ) : (
    <ItemContainer>
      <Carousel
        layout={"default"}
        data={data.allImages}
        firstItem={0}
        initialNumToRender={data.allImages.length}
        initialScrollIndex={0}
        sliderWidth={constants.width / 1.2}
        itemWidth={constants.width / 1.2}
        autoplay={true}
        // autoplayInterval={3000}
        loop={true}
        renderItem={({ item }: { item: { id: string; url: string } }) => (
          <ItemIamge source={{ uri: item.url }} resizeMode={"contain"} />
        )}
      />
    </ItemContainer>
  );
};
