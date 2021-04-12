import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import CameraSection from "../../components/CameraSection";
import { ComponentInMaterialTabs } from "../../types/interfaces";
import { CREATE_WORD } from "../../queries";
import { hostForDev } from "../../utils";

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
    try {
      if (ready) {
        const formData: any = new FormData();
        const takePhoto = await cameraRef.current?.takePictureAsync({
          quality: 1,
        });
        if (takePhoto) {
          const savedPhoto = await MediaLibrary.createAssetAsync(takePhoto.uri);
          const manipulatedImg = await ImageManipulator.manipulateAsync(
            savedPhoto.uri,
            [{ resize: { width: 300 } }]
          );
          if (savedPhoto) {
            formData.append("photo", {
              name: savedPhoto.filename,
              uri: manipulatedImg.uri,
              type: `image/${savedPhoto.filename.split(".")[1]}`,
            });
            const {
              data: { file },
            } = await axios({
              url: hostForDev(5000, "/api/upload"),
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: formData,
            });
            const { data } = await createWordMutation({
              variables: {
                name: stackRoute.params?.name,
                caption: stackRoute.params?.caption,
                url: file.linkUrl,
              },
            });
            if (data?.createWord?.result) {
              navigation.dispatch(StackActions.replace("Tab"));
            } else {
              throw Error(data?.createWord?.message);
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
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
