import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";

export default () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="" onPress={() => navigation.navigate("SelectPhoto")} />
      ),
    });
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>new word</Text>
    </View>
  );
};
