import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { StackNavigationP } from "../../types/interfaces";

export default ({ stackNavigation }: { stackNavigation: StackNavigationP }) => {
  useEffect(() => {
    stackNavigation.setOptions({
      headerRight: () => (
        <Button title="" onPress={() => console.log("test1")} />
      ),
    });
  }, [stackNavigation]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FromGoogle</Text>
    </View>
  );
};
