import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { COLORS } from "@/utils/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(32),
});

type FormData = z.infer<typeof schema>;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onRegister } = useAuth();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Test",
      email: "aaa@aaa.com",
      password: "123456",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const result = await onRegister!(data.email, data.password, data.name);
    if (result && result.error) {
      Alert.alert("Error", result.msg);
    } else {
      router.back();
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, justifyContent: "center" }}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name (optional)"
                placeholderTextColor={COLORS.placeholder}
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="John@doe.com"
                placeholderTextColor={COLORS.placeholder}
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={COLORS.placeholder}
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.button,
            !errors.email && !errors.password ? {} : styles.buttonDisabled,
          ]}
          disabled={!!errors.email || !!errors.password}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={"#fff"} />
        </View>
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: COLORS.input,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 4,
    color: "#FFF",
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff6b6b",
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
