import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import Loading from "../../components/Loading";
import PhotoAlbum from "../../components/PhotoAlbum";
import {
  ComponentInMaterialTabs,
  SrollBotReachedP,
} from "../../types/interfaces";

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [startNum, setStartNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectPhoto, setSelectPhoto] = useState<string>("");

  const onSrollBotReached = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: SrollBotReachedP): void => {
    const PADDING_BOTTOM: number = 0.1;
    const isBottom: boolean =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - PADDING_BOTTOM;
    if (isBottom) {
      // Refetch
      setStartNum((prev) => prev + 19);
    }
  };

  const fetchFromApi = async (): Promise<void> => {
    try {
      if (photos.length === 0) {
        setLoading(true);
      }
      const { data } = await axios.get(
        `http://172.30.53.104:3000/api/${stackRoute?.params?.name}/${startNum}`,
        {
          responseType: "json",
        }
      );
      setPhotos([...photos, ...data]);
      if (selectPhoto === "") {
        setSelectPhoto(data?.[0]);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Dont get the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFromApi();
  }, [startNum]);

  return loading || selectPhoto === "" ? (
    <Loading />
  ) : (
    <PhotoAlbum
      photos={photos}
      selectPhoto={selectPhoto}
      setSelectPhoto={setSelectPhoto}
      onSrollBotReached={onSrollBotReached}
      name={stackRoute.params?.name}
      caption={stackRoute.params?.caption}
    />
  );
};
