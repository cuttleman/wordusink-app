import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.bgColor};
`;

const MainCharacter = styled.Image`
  width: 250px;
  height: 300px;
  opacity: 0.9;
`;

export default ({ type }: { type: "empty" | "soon" }) => {
  return (
    <Container>
      <MainCharacter
        source={
          type === "empty"
            ? require(`../assets/empty.png`)
            : require(`../assets/soon.png`)
        }
        resizeMode="contain"
      />
    </Container>
  );
};
