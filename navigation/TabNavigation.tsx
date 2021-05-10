import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "../screens/Main/Home";
import Notification from "../screens/Main/Notification";
import Words from "../screens/Main/Words";
import Profile from "../screens/Main/Profile";
import FirstCharCards from "../screens/Word/FirstCharCards";
import EditWord from "../screens/Word/EditWord";
import AllCards from "../screens/Word/AllCards";
import EditProfile from "../screens/User/EditProfile";
import { StacksP } from "../types/interfaces";
import TabIcon from "../components/TabIcon";
import theme from "../theme";
import Manipulator from "../screens/Image/Manipulator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (stacks: StacksP[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.bgColor,
        },
        headerBackImage: () => (
          <MaterialIcons name={"keyboard-arrow-left"} size={30} />
        ),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: true,
        title: "",
      }}
    >
      {stacks.map((stack: StacksP, idx) => (
        <Stack.Screen key={idx} name={stack.name} component={stack.component} />
      ))}
    </Stack.Navigator>
  );
};

export default () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: theme.colors.bgColor,
          borderTopWidth: 0,
          elevation: 0,
          minHeight: 60,
        },
        tabStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName={"home"} />
          ),
        }}
      >
        {() =>
          stackFactory([
            { name: "Home", component: Home },
            { name: "FirstCharCards", component: FirstCharCards },
            { name: "EditWord", component: EditWord },
          ])
        }
      </Tab.Screen>
      <Tab.Screen
        name="Words"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName={"document-text"} />
          ),
        }}
      >
        {() =>
          stackFactory([
            { name: "Words", component: Words },
            { name: "AllCards", component: AllCards },
            { name: "EditWord", component: EditWord },
          ])
        }
      </Tab.Screen>
      <Tab.Screen
        name="FakeAdd"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        }}
        component={View}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName={"add-circle"} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName={"notifications"} />
          ),
        }}
      >
        {() =>
          stackFactory([{ name: "Notification", component: Notification }])
        }
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName={"person"} />
          ),
        }}
      >
        {() =>
          stackFactory([
            { name: "Profile", component: Profile },
            { name: "EditProfile", component: EditProfile },
            { name: "Manipulator", component: Manipulator },
          ])
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};
