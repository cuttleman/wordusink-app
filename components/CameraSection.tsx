import React from "react";
import styled from "styled-components/native";
import { CameraSectionP } from "../types/interfaces";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

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

const CameraSt = styled(Camera)`
  flex: 2;
`;

const ToggleBtn = styled.TouchableOpacity``;

const ControlBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  border: 15px solid #f1f2f6;
  border-radius: 50px;
  width: 100px;
  height: 100px;
`;

export default ({
  cameraRef,
  hasPermission,
  type,
  typeAction,
  takeAction,
  readyForCamera,
}: CameraSectionP) => (
  <Container>
    {!hasPermission ? (
      <NotPermission>
        <LightText>No access to Camera</LightText>
      </NotPermission>
    ) : (
      <Permission>
        <CameraSt ref={cameraRef} type={type} onCameraReady={readyForCamera}>
          <ToggleBtn onPress={typeAction}>
            <Ionicons name={"camera-reverse"} color={"#ffffff"} size={25} />
          </ToggleBtn>
        </CameraSt>
        <ControlBox>
          <TakePhotoBtn onPress={takeAction}></TakePhotoBtn>
        </ControlBox>
      </Permission>
    )}
  </Container>
);
