import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from "@/utils/colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#666",
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: "#fff",
      }}>
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
