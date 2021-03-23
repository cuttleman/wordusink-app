import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import CameraSection from "../../components/CameraSection";

export default () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);

  const getPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setHasPermission(granted);
  };

  const typeAction = () => {
    setType((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <CameraSection
      hasPermission={hasPermission}
      type={type}
      typeAction={typeAction}
    />
  );
};
