import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Home from "../screens/Main/Home";
import Profile from "../screens/Main/Profile";
import FirstCharCards from "../screens/Word/FirstCharCards";
import EditWord from "../screens/Word/EditWord";
import AllCards from "../screens/Word/AllCards";
import Preview from "../screens/Main/Preview";

interface stacksP {
  name: string;
  component: React.FC;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (stacks: stacksP[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      {stacks.map((stack: stacksP, idx) => (
        <Stack.Screen key={idx} name={stack.name} component={stack.component} />
      ))}
    </Stack.Navigator>
  );
};

export default () => {
  const { navigate } = useNavigation();
  return (
    <Tab.Navigator
      tabBarOptions={{
        // showLabel: false,
        style: { backgroundColor: "#574b90", borderTopWidth: 0 },
      }}
    >
      <Tab.Screen name="Home" options={{}}>
        {() =>
          stackFactory([
            { name: "Home", component: Home },
            { name: "FirstCharCards", component: FirstCharCards },
            { name: "AllCards", component: AllCards },
            { name: "EditWord", component: EditWord },
          ])
        }
      </Tab.Screen>
      <Tab.Screen
        name="Add"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigate("Add");
          },
        }}
        component={View}
      />
      <Tab.Screen name="Profile">
        {() => stackFactory([{ name: "Profile", component: Profile }])}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
