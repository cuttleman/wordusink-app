import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/Auth/SignUp";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode={"none"}>
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
