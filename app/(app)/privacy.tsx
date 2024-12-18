import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import React from "react";

const Page = () => {
  return (
    <WebView
      source={{ uri: "https://galaxies.dev/privacy" }}
      style={{ flex: 1 }}
    />
  );
};

export default Page;

const styles = StyleSheet.create({});
