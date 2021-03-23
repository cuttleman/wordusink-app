import React from "react";
import styled from "styled-components/native";
import { CameraSectionP } from "../types/interfaces";
import { Camera } from "expo-camera";

const Container = styled.View`
  flex: 1;
`;

const NotPermission = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LightText = styled.Text``;

const Permission = styled.View`
  flex: 1;
`;

const ToggleBtn = styled.TouchableOpacity``;

const ControlBox = styled.View`
  flex: 1;
`;

export default ({ hasPermission, type, typeAction }: CameraSectionP) => (
  <Container>
    {!hasPermission ? (
      <NotPermission
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <LightText>No access to Camera</LightText>
      </NotPermission>
    ) : (
      <Permission style={{ flex: 1 }}>
        <Camera style={{ flex: 2 }} type={type}>
          <ToggleBtn onPress={typeAction}>
            <LightText style={{ color: "white" }}>click</LightText>
          </ToggleBtn>
        </Camera>
        <ControlBox>
          <LightText>FromPhoto</LightText>
        </ControlBox>
      </Permission>
    )}
  </Container>
);
