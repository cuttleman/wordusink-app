import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import Loading from "../../components/Loading";
import PhotoAlbum from "../../components/PhotoAlbum";
import {
  ComponentInMaterialTabs,
  SrollBotReachedP,
} from "../../types/interfaces";
import { useMutation } from "@apollo/client";
import { StackActions, useNavigation } from "@react-navigation/core";
import { CREATE_WORD } from "../../queries";
import axios from "axios";

const START_NUM: number = 8;
const SCROLL_PADDING_BOTTOM: number = 0.1;

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [startNum, setStartNum] = useState<number>(START_NUM);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectPhoto, setSelectPhoto] = useState<MediaLibrary.Asset>();
  const [createWordMutation] = useMutation(CREATE_WORD);
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

  const createWordAction = async () => {
    if (selectPhoto !== undefined) {
      const formData = new FormData();
      formData.append("photo", {
        name: selectPhoto.filename,
        uri: selectPhoto.uri,
        type: `image/${selectPhoto.filename.split(".")[1]}`,
      });
      const result = await axios({
        url: "http://172.20.10.13:5000/api/upload",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      });
      console.log(result);
    }
    // try {
    // const { data } = await createWordMutation({
    //   variables: {
    //     name: stackRoute.params?.name,
    //     caption: stackRoute.params?.caption,
    //     url: selectPhoto,
    //   },
    // });
    // if (data?.createWord?.result) {
    //   navigation.dispatch(StackActions.replace("Tab"));
    // } else {
    //   throw Error(data?.createWord?.message);
    // }
    // } catch (e) {
    //   console.log(e);
    //   Alert.alert("error", e.message);
    // }
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
      createWordAction={createWordAction}
    />
  );
};
