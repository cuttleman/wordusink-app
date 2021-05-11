import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import { RefreshControl } from "react-native";
import CardListV from "../../components/CardListV";
import { ALL_WORDS } from "../../queries";
import { useNavigation } from "@react-navigation/core";
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
        contentContainerStyle={{ alignItems: "center", padding: 30 }}
      >
        <CardListV words={data?.allWords} loading={loading} />
      </ScrollContainer>
    </Container>
  );
};
