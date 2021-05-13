import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";

import { ALL_IMAGES, HAVING_WORDS } from "../../queries";
import { useNavigation } from "@react-navigation/core";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  Animated,
  Text,
  Easing,
} from "react-native";
import HomeSlide from "../../components/HomeSlide";
import SectionTitle from "../../components/SectionTitle";
import { globalNotifi } from "../../utils";
import constants from "../../constants";
import Loading from "../../components/Loading";
import { HavingWord } from "../../types/interfaces";

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

const CardListH = styled(Animated.View)`
  width: ${constants.width}px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.colors.tabColor};
  align-items: center;
  padding: 20px;
  position: absolute;
  z-index: 998;
`;

const PreviewWordContainer = styled(Animated.View)`
  border-width: 2px;
  border-color: ${(prop) => prop.theme.colors.mainColor};
  margin: 0 5px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const PreviewWord = styled.TouchableOpacity``;

const WordText = styled(Animated.Text)`
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  color: black;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 18px;
  text-transform: uppercase;
`;

const HomeContents = styled.View``;

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

  const animation = new Animated.Value(scrollDown ? 0 : 1);

  const textPadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 5],
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
    Animated.timing(animation, {
      toValue: scrollDown ? 1 : 0,
      duration: 700,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start();
  }, [animation]);

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
      <CardListH>
        <ScrollView
          horizontal
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          {havingLoading ? (
            <Loading />
          ) : havingData.havingWords.length === 0 ? (
            <Text>단어를 추가해보세요</Text>
          ) : (
            havingData.havingWords.map((word: HavingWord, idx: number) => (
              <PreviewWordContainer key={idx}>
                <PreviewWord
                  onPress={() =>
                    navigation.navigate("FirstCharCards", {
                      firstTerm: word.name,
                    })
                  }
                >
                  <WordText style={{ paddingVertical: textPadding }}>
                    {word.name}
                  </WordText>
                </PreviewWord>
              </PreviewWordContainer>
            ))
          )}
        </ScrollView>
      </CardListH>
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
          <HomeContents>
            <SectionTitle text={"이미지 보고 연습하기"} />
            <HomeSlide
              images={allImageData?.allImages}
              loading={allImageLoading}
            />
          </HomeContents>
        )}
      </ScrollContainer>
    </Container>
  );
};

export default Home;
