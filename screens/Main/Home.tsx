import React from "react";
import { Button, View } from "react-native";
import styled from "styled-components";
import CardListH from "../../components/CardListH";
import { useLogOut } from "../../components/AuthContext";
import { words } from "../../utils";

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;

const Home: React.FC = () => {
  const logOut = useLogOut();
  return (
    <Container>
      <CardListH words={words.split("")} />
      <Button title="a" onPress={() => logOut()}>
        logOut
      </Button>
    </Container>
  );
};

export default Home;
