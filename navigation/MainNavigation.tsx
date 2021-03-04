import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Main/Home";
import Words from "../screens/Main/Words";
import Community from "../screens/Main/Community";
import Profile from "../screens/Main/Profile";
import Card from "../screens/Word/Card";
import EditWord from "../screens/Word/EditWord";

interface stacksP {
  name: string;
  component: React.FC;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (stacks: stacksP[]) => {
  return (
    <Stack.Navigator
      headerMode={"none"}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {stacks.map((stack: stacksP, idx) => (
        <Stack.Screen key={idx} name={stack.name} component={stack.component} />
      ))}
    </Stack.Navigator>
  );
};

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Home">
      {() =>
        stackFactory([
          { name: "Home", component: Home },
          { name: "Card", component: Card },
          { name: "EditWord", component: EditWord },
        ])
      }
    </Tab.Screen>
    <Tab.Screen name="Words">
      {() => stackFactory([{ name: "Words", component: Words }])}
    </Tab.Screen>
    <Tab.Screen name="Community">
      {() => stackFactory([{ name: "Community", component: Community }])}
    </Tab.Screen>
    <Tab.Screen name="Profile">
      {() => stackFactory([{ name: "Profile", component: Profile }])}
    </Tab.Screen>
  </Tab.Navigator>
);
