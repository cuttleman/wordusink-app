import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Main/Home";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode={"none"}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
