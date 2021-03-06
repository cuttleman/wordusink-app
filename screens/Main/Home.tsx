import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import CardListH from "../../components/CardListH";
import { words } from "../../utils";

const Container = styled(View)`
  flex: 1;
  background-color: #786fa6;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <CardListH words={words.split("")} />
    </Container>
  );
};

export default Home;
