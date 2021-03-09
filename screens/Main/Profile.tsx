import React from "react";
import { Button, Text, View } from "react-native";
import styled from "styled-components";
import { useLogOut } from "../../components/AuthContext";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextSt = styled(Text)``;

const Profile: React.FC = () => {
  const logOut = useLogOut();
  return (
    <Container>
      <TextSt>Profile</TextSt>
      <Button title="logout" onPress={logOut}>
        <Text>log out</Text>
      </Button>
    </Container>
  );
};

export default Profile;
