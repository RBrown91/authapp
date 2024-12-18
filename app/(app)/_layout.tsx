import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { token, initialised } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialised) return;

    const inAuthGroup = segments[1] === "(authenticated)";
    console.log("inAuthGroup: ", inAuthGroup);

    if (token && !inAuthGroup) {
      router.replace("/(app)/(authenticated)/(tabs)/messages");
    } else if (!token && inAuthGroup) {
      router.replace("/");
    }
  }, [initialised, token]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="privacy"
        options={{ presentation: "modal", title: "Privacy Policy" }}
      />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
          headerBackTitle: "Login",
        }}
      />
    </Stack>
  );
}
