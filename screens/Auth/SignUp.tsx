import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SignUp: React.FC = () => {
  const signUpWithGoogle = () => {
    // Google Auth api with Expo
  };
  return (
    <Container>
      <AuthButton
        text={"with Google"}
        type={"google"}
        onPress={signUpWithGoogle}
      />
    </Container>
  );
};

export default SignUp;
