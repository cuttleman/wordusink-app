import React from "react";
import styled from "styled-components/native";
import { RefreshControl } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "./Avatar";
import useSlide from "../hooks/useSlide";
import UserOptions from "./UserOptions";
import { UserP } from "../types/interfaces";
import constants from "../constants";

const Container = styled.ScrollView`
  width: ${constants.width}px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  padding-top: 15px;
`;

const Header = styled.View`
  height: 60px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.colors.tabColor};
`;

const UserName = styled.Text`
  font-size: 25px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

const Options = styled.TouchableOpacity``;

export default ({ refreshing, onRefresh, self }: UserP) => {
  const { toggleOpen, sliding } = useSlide();
  return (
    <>
      <Header style={{ elevation: 5 }}>
        <UserName>{self?.userName ? self?.userName : "Human"}</UserName>
        <Options onPress={toggleOpen}>
          <AntDesign name={"menufold"} size={24} />
        </Options>
        <UserOptions animation={sliding} toggleFunc={toggleOpen} />
      </Header>
      <Container
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Avatar
          avatar={self ? self.avatar : require("../assets/init_human.png")}
          size={"lg"}
        />
      </Container>
    </>
  );
};
