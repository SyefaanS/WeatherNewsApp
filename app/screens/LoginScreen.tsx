import React, { useState, useRef } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/useTheme";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const emailInputRef = useRef(null);
  const theme = useTheme();

  // Simple email validation regex
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
