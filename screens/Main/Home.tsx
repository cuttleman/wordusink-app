import React, { useState } from "react";
import styled from "styled-components";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import CardListH from "../../components/CardListH";
import { HAVING_WORDS } from "../../queries";
import Loading from "../../components/Loading";

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #786fa6;
`;

const Home: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(HAVING_WORDS);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CardListH words={data?.havingWords} />
    </Container>
  );
};

export default Home;
