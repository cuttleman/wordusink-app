import React from "react";
import styled from "styled-components/native";
import { AvatarP, AvatarStyle } from "../types/interfaces";

const Container = styled.View`
  border-radius: 100px;
  background-color: white;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.colors.tabColor};
`;

const Avatar = styled.Image<AvatarStyle>`
  width: ${(props) =>
    props.size === "lg" ? "150px" : props.size === "md" ? "80px" : "50px"};
  height: ${(props) =>
    props.size === "lg" ? "150px" : props.size === "md" ? "80px" : "50px"};
`;

export default ({ avatar, size = "sm" }: AvatarP) => (
  <Container>
    <Avatar
      size={size}
      source={avatar ? { uri: avatar } : require("../assets/init_human.png")}
    />
  </Container>
);
