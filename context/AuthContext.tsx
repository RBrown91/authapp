import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser } from "@/utils/api";

const JWT_KEY = "jwt-key";

interface DecodedToken {
  id: number;
}

type AuthProps = {
  token: string | null;
  userId: number | null;
  onRegister: (email: string, password: string, name: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
  initialised: boolean;
};

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [initialised, setInitialised] = useState(false);

  const processToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log("Decoded Token:", decodedToken);
      setToken(token);
      setUserId(decodedToken.id);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(JWT_KEY);
      if (storedToken) {
        processToken(storedToken);
      }
      setInitialised(true);
    };
    loadToken();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    const token = result.data;
    processToken(token);
    await SecureStore.setItemAsync(JWT_KEY, token);
    return result;
  };

  const handleRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const result = await registerUser(email, password, name);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    return result;
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    setToken(null);
    setUserId(null);
  };

  const value = {
    initialised,
    token,
    userId,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
