import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/useTheme";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession(); // Required for redirect flow

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const emailInputRef = useRef(null);
  const theme = useTheme();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!username || !email) {
      Alert.alert("Error", "Please enter both username and email.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const user = { username, email };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace("Home");
  };

  // ---------------- GOOGLE LOGIN SETUP ----------------
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "213285430672-7b1k2rb9sl94eaesrhe2q1v8l5t0r97b.apps.googleusercontent.com", // Replace this with your actual client ID
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const user = {
        username: "Google User",
        email: "googleuser@example.com",
        token: authentication?.accessToken,
      };

      AsyncStorage.setItem("user", JSON.stringify(user)).then(() => {
        navigation.replace("Home");
      });
    }
  }, [response]);

  // ---------------------------------------------------

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
          },
        ]}
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
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
          },
        ]}
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

      <View style={{ height: 20 }} />

      <Button
        title="Login with Google"
        onPress={() => promptAsync()}
        disabled={!request}
        color="#EA4335"
        testID="googleLoginButton"
      />
    </View>
  );
};

export default LoginScreen;

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
});
