import { useState, useEffect } from "react";
import { Appearance } from "react-native";

export const lightTheme = {
  background: "#fff",
  text: "#000",
  inputBackground: "#f2f2f2",
  inputBorder: "#ccc",
  buttonBackground: "#3498db",
  buttonText: "#fff",
};

export const darkTheme = {
  background: "#121212",
  text: "#fff",
  inputBackground: "#1e1e1e",
  inputBorder: "#444",
  buttonBackground: "#2980b9",
  buttonText: "#fff",
};

export const useTheme = () => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    });
    return () => subscription.remove();
  }, []);

  return theme;
};
