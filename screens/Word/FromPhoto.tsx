import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import CameraSection from "../../components/CameraSection";
import {
  ComponentInMaterialTabs,
  ManipulatorPassP,
} from "../../types/interfaces";

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<"back" | "front">("back");
  const [ready, setReady] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
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
      setIsTake(true);
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
            filename: `photo_of_${stackRoute.params?.name}`,
            from: "Photo",
          };
          navigation.navigate("Manipulator", { ...passedData });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => setIsTake(false), 1000);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {});

  return (
    <CameraSection
      cameraRef={cameraRef}
      hasPermission={hasPermission}
      type={type}
      typeAction={typeAction}
      takeAction={takeAction}
      readyForCamera={readyForCamera}
      isTake={isTake}
    />
  );
};
