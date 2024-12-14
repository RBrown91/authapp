import {
  ActivityIndicator,
  Image,
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
import { Link, useRouter } from "expo-router";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "aaa@aaa.com",
      password: "123456",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Hello");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, justifyContent: "center" }}>
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
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Register</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/privacy" asChild>
          <TouchableOpacity style={styles.privacy}>
            <Text style={styles.privacyText}>Privacy Policy</Text>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={"#fff"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  outlineButton: {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 12,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    marginVertical: 20,
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
  privacy: {
    alignItems: "center",
    paddingTop: 18,
  },
  privacyText: {
    fontSize: 16,
    color: "white",
  },
});
