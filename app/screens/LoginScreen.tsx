import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "../theme/useTheme";

WebBrowser.maybeCompleteAuthSession(); // Handles OAuth redirect

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const emailInputRef = useRef(null);
  const theme = useTheme();

  // Setup Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "213285430672-7b1k2rb9sl94eaesrhe2q1v8l5t0r97b.apps.googleusercontent.com",
  });

  // Handle Google Login Response
  useEffect(() => {
    if (response?.type === "success") {
      const { accessToken } = response.authentication || {};
      saveUserAndNavigate({
        username: "Google User",
        email: "googleuser@example.com",
        token: accessToken,
      });
    }
  }, [response]);

  // Email validation
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Save user and navigate to Home
  const saveUserAndNavigate = async (user: object) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace("Home");
  };

  // Handle manual login
  const handleLogin = () => {
    if (!username || !email) {
      return Alert.alert("Missing Fields", "Please fill out both fields.");
    }

    if (!isEmailValid(email)) {
      return Alert.alert("Invalid Email", "Please enter a valid email address.");
    }

    saveUserAndNavigate({ username, email });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.placeholder}
        style={[styles.input, inputStyle(theme)]}
        value={username}
        onChangeText={setUsername}
        returnKeyType="next"
        onSubmitEditing={() => emailInputRef.current?.focus()}
        blurOnSubmit={false}
      />

      <TextInput
        ref={emailInputRef}
        placeholder="Email"
        placeholderTextColor={theme.placeholder}
        style={[styles.input, inputStyle(theme)]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="done"
        onSubmitEditing={handleLogin}
      />

      <Button
        title="Login"
        onPress={handleLogin}
        color={theme.buttonBackground}
        testID="loginButton"
      />

      <View style={styles.spacer} />

      <Button
        title="Login with Google"
        onPress={() => promptAsync()}
        disabled={!request}
        color="#EA4335"
        testID="googleLoginButton"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// Helper for styling input based on theme
const inputStyle = (theme) => ({
  backgroundColor: theme.inputBackground,
  color: theme.text,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 24,
  },
  spacer: {
    height: 20,
  },
});
