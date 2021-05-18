import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import CameraSection from "../../components/CameraSection";
import {
  ComponentInMaterialTabs,
  ManipulatorPassP,
  StackRouteP,
} from "../../types/interfaces";
import { CREATE_WORD } from "../../queries";
import { globalNotifi, hostForDev } from "../../utils";

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<"back" | "front">("back");
  const [ready, setReady] = useState<boolean>(false);
  const [createWordMutation] = useMutation(CREATE_WORD);
  const navigation = useNavigation();

  const getPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setHasPermission(granted);
  };

  const readyForCamera = () => {
    setReady(true);
  };

  const typeAction = () => {
    setType((prev): "back" | "front" => (prev === "back" ? "front" : "back"));
  };

  const takeAction = async () => {
    if (ready) {
      try {
        const takePhoto = await cameraRef.current?.takePictureAsync({
          quality: 1,
        });
        if (takePhoto) {
          const passedData: Partial<ManipulatorPassP> = {
            url: takePhoto.uri,
            name: stackRoute.params?.name,
            caption: stackRoute.params?.caption,
            examples: stackRoute.params?.examples,
            from: "Photo",
          };
          navigation.navigate("Manipulator", { ...passedData });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <CameraSection
      cameraRef={cameraRef}
      hasPermission={hasPermission}
      type={type}
      typeAction={typeAction}
      takeAction={takeAction}
      readyForCamera={readyForCamera}
    />
  );
};
