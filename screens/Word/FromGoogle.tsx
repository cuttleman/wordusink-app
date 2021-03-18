import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import Loading from "../../components/Loading";
import constants from "../../constants";
import { SrollBotReachedP, StackNavigationP } from "../../types/interfaces";

export default ({ stackNavigation }: { stackNavigation: StackNavigationP }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [startNum, setStartNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onSrollBotReached = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: SrollBotReachedP): void => {
    const PADDING_BOTTOM = 2 as number;
    const isBottom = (layoutMeasurement.height + contentOffset.y >=
      contentSize.height - PADDING_BOTTOM) as boolean;
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
        `http://172.30.55.45:3000/api/apple/${startNum}`,
        {
          responseType: "json",
        }
      );
      setPhotos([...photos, ...data]);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Dont get the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    stackNavigation.setOptions({
      headerRight: () => (
        <Button title="" onPress={() => console.log("test1")} />
      ),
    });
  }, [stackNavigation]);

  useEffect(() => {
    fetchFromApi();
  }, [startNum]);

  return loading ? (
    <Loading />
  ) : (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: constants.width,
      }}
      onScroll={({ nativeEvent }) => onSrollBotReached(nativeEvent)}
    >
      {photos.map((photo, index) => (
        <Image
          key={index}
          source={{ uri: photo }}
          style={{ width: constants.width / 3, height: constants.height / 6 }}
        />
      ))}
    </ScrollView>
  );
};
