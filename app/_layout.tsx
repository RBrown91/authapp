import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
