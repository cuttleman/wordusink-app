import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import CardListH from "../../components/CardListH";
import { HAVING_WORDS } from "../../queries";
import { useNavigation } from "@react-navigation/core";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from "react-native";
import constants from "../../constants";
import HomeSlide from "../../components/HomeSlide";
import SectionTitle from "../../components/SectionTitle";

const Container = styled.View`
  flex: 1;
  background-color: ${(prop) => prop.theme.bgColor};
`;

const ScrollContainer = styled.ScrollView`
  background-color: transparent;
`;

const BgImage = styled.Image`
  position: absolute;
  flex: 1;
  opacity: 0.3;
  z-index: 0;
  bottom: 0;
  left: 0;
`;

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(HAVING_WORDS, {
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: { y: scrollY },
        velocity,
      },
    } = event;

    if (velocity !== undefined) {
      if (!scrollDown) {
        if (velocity.y >= 0 && Math.floor(scrollY) > 30) {
          setScrollDown(true);
        }
      } else {
        if (velocity.y < 0 && Math.floor(scrollY) < 60) {
          setScrollDown(false);
        }
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <BgImage
        source={require("../../assets/front.png")}
        resizeMode={"contain"}
      />
      <CardListH
        words={data?.havingWords}
        scrollEvent={scrollDown}
        loading={loading}
      />
      <ScrollContainer
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={150}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 130,
          paddingBottom: 70,
        }}
        onScroll={onScroll}
      >
        <SectionTitle text={"PRACTICE FROM IMAGES"} />
        <HomeSlide />
      </ScrollContainer>
    </Container>
  );
};

export default Home;
