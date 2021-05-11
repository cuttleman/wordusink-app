import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import CardListH from "../../components/CardListH";
import { ALL_IMAGES, HAVING_WORDS } from "../../queries";
import { useNavigation } from "@react-navigation/core";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from "react-native";
import HomeSlide from "../../components/HomeSlide";
import SectionTitle from "../../components/SectionTitle";
import { globalNotifi } from "../../utils";

const Container = styled.View`
  flex: 1;
  background-color: ${(prop) => prop.theme.colors.bgColor};
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
  const {
    data: havingData,
    loading: havingLoading,
    refetch: havingRefetch,
  } = useQuery(HAVING_WORDS, {
    fetchPolicy: "network-only",
  });
  const {
    data: allImageData,
    loading: allImageLoading,
    refetch: allImageRefetch,
  } = useQuery(ALL_IMAGES, {
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      havingRefetch();
      allImageRefetch();
    } catch (e) {
      console.log(e);
      globalNotifi("error", "새로고침 할 수 없습니다.😱");
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

  useEffect(() => {
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
        words={havingData?.havingWords}
        scrollEvent={scrollDown}
        loading={havingLoading}
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
        {havingData?.havingWords?.length !== 0 && (
          <>
            <SectionTitle text={"이미지 보고 연습하기"} />
            <HomeSlide
              images={allImageData?.allImages}
              loading={allImageLoading}
            />
          </>
        )}
      </ScrollContainer>
    </Container>
  );
};

export default Home;
