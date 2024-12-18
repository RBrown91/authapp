import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
