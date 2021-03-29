import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import Test from "expo-camera";
import CameraSection from "../../components/CameraSection";
import axios from "axios";

export default () => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);

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
    console.log(ready);
    // const formData = new FormData();
    // const demoImageUrl =
    //   "https://wan-ifra.org/wp-content/uploads/2020/11/Screenshot-2020-11-02-at-14.56.02.png";
    // formData.append("photo", {
    //   name: "sdfs",
    //   uri: demoImageUrl,
    //   type: "image/png",
    // });
    // console.log(formData);
    try {
      if (ready) {
        const result = await cameraRef.current?.takePictureAsync({
          quality: 1,
        });
        console.log(result);
      }
      // const result = await axios({
      //   url: "http://172.30.1.33:5000/api/upload",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "image/png",
      //   },
      //   data: formData,
      // });
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
