import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextSt = styled(Text)``;

const Home: React.FC = () => {
  return (
    <Container>
      <TextSt>Home</TextSt>
    </Container>
  );
};

export default Home;
