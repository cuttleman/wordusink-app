import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import Loading from "../../components/Loading";
import PhotoAlbum from "../../components/PhotoAlbum";
import {
  ComponentInMaterialTabs,
  SrollBotReachedP,
} from "../../types/interfaces";
import { StackActions, useNavigation } from "@react-navigation/core";
import { useMutation } from "@apollo/client";
import { CREATE_WORD } from "../../queries";

export default ({ stackRoute }: ComponentInMaterialTabs) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [startNum, setStartNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [selectPhoto, setSelectPhoto] = useState<string>("");
  const [createWordMutation] = useMutation(CREATE_WORD);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const navigation = useNavigation();

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
      if (!fetching) setStartNum((prev) => prev + 19);
    }
  };

  const createWordAction = async () => {
    try {
      const { data } = await createWordMutation({
        variables: {
          name: stackRoute.params?.name,
          caption: stackRoute.params?.caption,
          url: selectPhoto,
        },
      });
      if (data?.createWord?.result) {
        // Will Change - regist 2021/3/21
        navigation.dispatch(StackActions.replace("Tab"));
      } else {
        throw Error(data?.createWord?.message);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("error", e.message);
    }
  };

  const selectPhotoAction = (selected: string) => {
    setSelectPhoto(selected);
  };

  const fetchFromApi = async (): Promise<void> => {
    if (photos.length === 0) setLoading(true);
    try {
      setFetching(true);
      const { data } = await axios.get(
        `http://172.30.1.25:3000/api/${stackRoute?.params?.name}/${startNum}`,
        {
          responseType: "json",
        }
      );
      const filteringArray = data.filter((image: string) => {
        const pattern = new RegExp("^(data:image|https://encrypted-tbn0).*");
        const result = pattern.test(image);
        if (result) return image;
      });

      if (filteringArray.length === 0) {
        setHasNext(false);
      } else {
        setPhotos([...photos, ...filteringArray]);
      }
      // Initial selected photo
      if (selectPhoto === "") {
        setSelectPhoto(filteringArray?.[0]);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Dont get the data");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    if (hasNext) fetchFromApi();
  }, [startNum]);

  return loading || selectPhoto === "" || photos.length === 0 ? (
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
