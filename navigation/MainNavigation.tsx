import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import AddNavigation from "./AddNavigation";
import TabNavigation from "./TabNavigation";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Tab" component={TabNavigation} />
    <Stack.Screen name="Add" component={AddNavigation} />
  </Stack.Navigator>
);
