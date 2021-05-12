import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as MediaLibrary from "expo-media-library";
import Loading from "../../components/Loading";
import PhotoAlbum from "../../components/PhotoAlbum";
import {
  ComponentInMaterialTabs,
  ManipulatorPassP,
  SrollBotReachedP,
} from "../../types/interfaces";

const START_NUM: number = 12;
const SCROLL_PADDING_BOTTOM: number = 0.1;

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [startNum, setStartNum] = useState<number>(START_NUM);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectPhoto, setSelectPhoto] = useState<MediaLibrary.Asset>();
  const navigation = useNavigation();

  const onSrollBotReached = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: SrollBotReachedP): void => {
    const isBottom: boolean =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - SCROLL_PADDING_BOTTOM;
    if (isBottom) {
      if (hasNext) {
        setStartNum((prev) => prev + START_NUM);
      }
    }
  };

  const nextAction = async () => {
    const passedData: Partial<ManipulatorPassP> = {
      url: selectPhoto?.uri,
      name: stackRoute.params?.name,
      caption: stackRoute.params?.caption,
      examples: stackRoute.params?.examples,
      filename: selectPhoto?.filename,
      from: "Library",
    };
    navigation.navigate("Manipulator", { ...passedData });
  };

  const selectPhotoAction = (selected: MediaLibrary.Asset) => {
    setSelectPhoto(selected);
  };

  const getFromLibrary = async (): Promise<void> => {
    try {
      if (photos.length === 0) {
        setLoading(true);
      }
      const { granted } = await MediaLibrary.requestPermissionsAsync();

      if (granted) {
        const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
          first: startNum,
        });
        setPhotos(assets);
        setHasNext(hasNextPage);

        // Initial selected
        if (selectPhoto === undefined) {
          setSelectPhoto(assets[0]);
        }
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Dont get the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFromLibrary();
  }, [startNum]);

  return loading || selectPhoto === undefined ? (
    <Loading />
  ) : (
    <PhotoAlbum
      photos={photos}
      selectPhoto={selectPhoto}
      selectPhotoAction={selectPhotoAction}
      onSrollBotReached={onSrollBotReached}
      doneAction={nextAction}
    />
  );
};
