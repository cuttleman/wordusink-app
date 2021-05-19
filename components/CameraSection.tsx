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
  flex: 3;
`;

const ToggleBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 15px;
  left: 15px;
  padding: 5px;
`;

const ControlBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-top-width: 2px;
  border-top-color: white;
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
  isTake,
  readyForCamera,
}: CameraSectionP) => (
  <Container>
    {!hasPermission ? (
      <NotPermission>
        <LightText>No access to Camera</LightText>
      </NotPermission>
    ) : (
      <Permission>
        <CameraSt
          ref={cameraRef}
          type={type}
          zoom={0}
          onCameraReady={readyForCamera}
        >
          <ToggleBtn onPress={typeAction}>
            <Ionicons name={"camera-reverse"} color={"#ffffff"} size={30} />
          </ToggleBtn>
        </CameraSt>
        <ControlBox>
          <TakePhotoBtn onPress={takeAction} disabled={isTake}></TakePhotoBtn>
        </ControlBox>
      </Permission>
    )}
  </Container>
);
