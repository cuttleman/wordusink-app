import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import AuthButton from "../../components/AuthButton";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLogIn } from "../../components/AuthContext";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffeaa7;
`;

const SIGN_UP = gql`
  mutation signUp($email: String!) {
    signUp(email: $email) {
      type
      message
      token
    }
  }
`;

const SignUp: React.FC = () => {
  const [_, __, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "873102509009-39ht480mj5i51r7o89uf1e78s2hb6s8l.apps.googleusercontent.com",
  });
  const [signUpMutation] = useMutation(SIGN_UP);
  const logIn = useLogIn();

  const signUpWithGoogle = async () => {
    try {
      // Google Auth api with Expo
      const result = await promptAsync();
      if (result.type === "success") {
        const {
          data: { email },
        } = await axios({
          url: "https://www.googleapis.com/userinfo/v2/me",
          responseType: "json",
          method: "get",
          headers: {
            Authorization: `Bearer ${result?.authentication?.accessToken}`,
          },
        });
        if (email) {
          const {
            data: {
              signUp: { token, message, type },
            },
          } = await signUpMutation({ variables: { email } });
          if (type === true) {
            logIn(token);
          } else {
            throw Error(message);
          }
        }
      }
    } catch (e) {
      console.log(e.message);
    }
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
