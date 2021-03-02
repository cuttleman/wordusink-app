import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextSt = styled(Text)``;

const Profile: React.FC = () => {
  return (
    <Container>
      <TextSt>Profile</TextSt>
    </Container>
  );
};

export default Profile;
