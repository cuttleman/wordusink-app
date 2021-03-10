import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, RefreshControl, Text } from "react-native";
import styled from "styled-components/native";
import { useLogOut } from "../../components/AuthContext";
import Avatar from "../../components/Avatar";
import Loading from "../../components/Loading";
import constants from "../../constants";
import { SELF_PROFILE } from "../../queries";

const Container = styled.ScrollView`
  width: ${constants.width}px;
  background-color: #786fa6;
  padding-top: 15px;
`;

const Profile: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(SELF_PROFILE);
  const logOut = useLogOut();

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
      contentContainerStyle={{ alignItems: "center" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Avatar avatar={data?.self?.avatar} size={"lg"} />
      <Button title="logout" onPress={logOut}>
        <Text>log out</Text>
      </Button>
    </Container>
  );
};

export default Profile;
