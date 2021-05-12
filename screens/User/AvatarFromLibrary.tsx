import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import Loading from "../../components/Loading";
import PhotoAlbum from "../../components/PhotoAlbum";
import { AvatarFromLibraryP, SrollBotReachedP } from "../../types/interfaces";
import { globalNotifi } from "../../utils";

const START_NUM: number = 12;
const SCROLL_PADDING_BOTTOM: number = 0.1;

export default ({ setAvatarAction }: AvatarFromLibraryP) => {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [startNum, setStartNum] = useState<number>(START_NUM);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectPhoto, setSelectPhoto] = useState<MediaLibrary.Asset>();

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
      globalNotifi("error", "앨범 접근권한이 없습니다.😨");
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
      doneAction={() => setAvatarAction(selectPhoto)}
    />
  );
};
