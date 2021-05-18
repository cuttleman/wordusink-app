import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";
import IssueImage from "../../components/IssueImage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.bgColor};
`;

const Maincharacter = styled.Image`
  width: 250px;
  height: 300px;
`;

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <IssueImage type="soon" />
    </Container>
  );
};
