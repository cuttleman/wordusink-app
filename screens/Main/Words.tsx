import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import { RefreshControl, Text } from "react-native";
import { ALL_WORDS } from "../../queries";
import { useNavigation } from "@react-navigation/core";
import { globalNotifi } from "../../utils";
import Loading from "../../components/Loading";
import { PartialWord, CardNameSt, IsCaptionP } from "../../types/interfaces";
import constants from "../../constants";
import IssueImage from "../../components/IssueImage";

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

const WordsContainer = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
`;

const ContentContainer = styled.TouchableOpacity`
  width: ${constants.width / 1.3}px;
  height: ${constants.height / 10}px;
  background-color: white;
  margin: 10px 0;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.colors.tabColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
`;

const SectionContainer = styled.View<CardNameSt>`
  width: ${constants.width / 3}px;
  justify-content: center;
  align-items: ${(props) => (props.isName ? "flex-start" : "flex-end")};
`;

const Name = styled.Text`
  font-size: 17px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  text-transform: capitalize;
`;

const Caption = styled.Text<IsCaptionP>`
  font-size: 15px;
  color: ${(prop) => (prop.isCaption ? "black" : prop.theme.colors.tabColor)};
`;

export default () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(ALL_WORDS, {
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      refetch();
    } catch (e) {
      console.log(e);
      globalNotifi("error", "새로고침 할 수 없습니다.😱");
    } finally {
      setRefreshing(false);
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
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        {loading ? (
          <Loading />
        ) : data?.allWords?.length === 0 ? (
          <IssueImage type="empty" />
        ) : (
          <WordsContainer>
            {data?.allWords?.map((word: PartialWord, index: number) => (
              <ContentContainer
                key={word.id}
                onPress={() =>
                  navigation.navigate("AllCards", {
                    words: data?.allWords,
                    index,
                  })
                }
                style={{ elevation: 8 }}
              >
                <SectionContainer isName>
                  <Name>{word.name}</Name>
                </SectionContainer>
                <SectionContainer>
                  <Caption isCaption={word.caption}>
                    {word.caption ? word.caption : "입력해주세요"}
                  </Caption>
                </SectionContainer>
              </ContentContainer>
            ))}
          </WordsContainer>
        )}
      </ScrollContainer>
    </Container>
  );
};
