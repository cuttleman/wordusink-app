import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import CameraSection from "../../components/CameraSection";
import { ComponentInMaterialTabs } from "../../types/interfaces";
import { CREATE_WORD } from "../../queries";

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
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
    setType((prev) => (prev === 0 ? 1 : 0));
  };

  const takeAction = async () => {
    const formData = new FormData();
    const demoImageUrl =
      "https://wan-ifra.org/wp-content/uploads/2020/11/Screenshot-2020-11-02-at-14.56.02.png";
    try {
      if (true) {
        // const result = await cameraRef.current?.takePictureAsync({
        //   quality: 1,
        // });
        formData.append("photo", {
          name: "sdfs",
          uri: demoImageUrl,
          type: "image/png",
        });
      }
      const {
        data: { file },
      } = await axios({
        url: "http://172.30.1.25:5000/api/upload",
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
          url: file.path,
        },
      });
      if (data?.createWord?.result) {
        navigation.dispatch(StackActions.replace("Tab"));
      } else {
        throw Error(data?.createWord?.message);
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
