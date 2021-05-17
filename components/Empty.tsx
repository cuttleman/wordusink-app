import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  return (
    <Container>
      <Text>데이터가 없습니다.</Text>
    </Container>
  );
};
