
import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home";
import Links from "../components/Links";
import SetConfig from "../components/SetConfig";
import { Ionicons, Entypo } from '@expo/vector-icons';  

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          padding: 10,
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 30,
          backgroundColor: "#f23a6b",
          justifyContent:"center",
          alignContent: "center"
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#f3f3f3",
      }}
    >
      <Tab.Screen
        name="Links"
        component={Links}
        options={{
           
          tabBarIcon: ({ size, color }) => <Entypo name="link" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          
          tabBarIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Configruações"
        component={SetConfig}
        options={{
            
          tabBarIcon: ({ size, color }) =>  <Ionicons name="ios-settings-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

