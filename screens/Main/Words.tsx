import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import { RefreshControl } from "react-native";
import CardListV from "../../components/CardListV";
import { ALL_WORDS } from "../../queries";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/core";

const ScrollContainer = styled.ScrollView`
  width: ${constants.width}px;
  height: ${constants.height}px;
  background-color: #786fa6;
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
    } finally {
      setRefreshing(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "모든 단어",
    });
  }, [navigation]);

  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", padding: 30 }}
    >
      <CardListV words={data?.allWords} loading={loading} />
    </ScrollContainer>
  );
};
