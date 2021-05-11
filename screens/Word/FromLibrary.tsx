import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import Loading from "../../components/Loading";
import PhotoAlbum from "../../components/PhotoAlbum";
import {
  ComponentInMaterialTabs,
  SrollBotReachedP,
} from "../../types/interfaces";
import { useMutation } from "@apollo/client";
import { StackActions, useNavigation } from "@react-navigation/core";
import { CREATE_WORD } from "../../queries";
import { exampleGenerator, globalNotifi, hostForDev } from "../../utils";

const START_NUM: number = 12;
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

  const uploadImage = async (manipulatedUrl: string) => {
    const formData: any = new FormData();
    if (selectPhoto !== undefined) {
      const manipulatedImg = await ImageManipulator.manipulateAsync(
        manipulatedUrl,
        [{ resize: { width: 200 } }]
      );
      formData.append("photo", {
        name: selectPhoto.filename,
        uri: manipulatedImg.uri,
        type: `image/${selectPhoto.filename.split(".")[1]}`,
      });
      try {
        const {
          data: { file },
        } = await axios.post(hostForDev(5000, "/api/upload/word"), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const { data } = await createWordMutation({
          variables: {
            name: stackRoute.params?.name,
            caption: stackRoute.params?.caption,
            examples: stackRoute.params?.examples,
            url: file.linkUrl,
          },
        });
        if (data?.createWord?.result) {
          navigation.dispatch(StackActions.replace("Tab"));
          globalNotifi("success", "새 단어가 등록되었습니다.😎");
        } else {
          throw Error(data?.createWord?.message);
        }
      } catch (e) {
        globalNotifi("error", e.message);
      }
    }
  };

  const nextAction = async () => {
    const passedData = {
      url: selectPhoto?.uri,
      doneAction: (url: string) => uploadImage(url),
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
