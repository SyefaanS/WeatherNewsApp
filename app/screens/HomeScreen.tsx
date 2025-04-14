import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Alert, BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { fetchWeatherRequest } from "../features/weather/weatherSlice";
import { RootState } from "../store";
import {
  ScreenContainer,
  Title,
  RegularText,
  ButtonContainer,
  StyledButton,
  Card,
} from "../theme/styledComponents";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const [username, setUsername] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Load user name from AsyncStorage
  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const { username, email } = JSON.parse(storedUser);
        setUsername(username);
        setEmail(email);
      }
    };
    getUser();
  }, []);

  const [email, setEmail] = useState<string | null>(null);

  // Handle back button to logout
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Logout", "Do you want to logout?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            onPress: async () => {
              await AsyncStorage.removeItem("user");
              navigation.replace("Login");
            },
            style: "destructive",
          },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  // Request location permission and fetch weather
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to fetch weather data."
        );
        return;
      }
      setPermissionGranted(true);
      dispatch(fetchWeatherRequest());
    };

    getPermission();
  }, [dispatch]);

  if (!permissionGranted || loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <RegularText>
          Error: {typeof error === "string" ? error : "Something went wrong"}
        </RegularText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Card>
        <Title>{username ? `Welcome, ${username}!` : "Welcome!"}</Title>
        {email && <Title>{email}</Title>}
        <RegularText>Weather in {data?.name || "N/A"}</RegularText>
        <RegularText>
          Temperature: {data?.main?.temp ? `${data.main.temp}°C` : "N/A"}
        </RegularText>

        <ButtonContainer>
          <StyledButton onPress={() => navigation.navigate("News")}>
            <RegularText>View News</RegularText>
          </StyledButton>
        </ButtonContainer>
      </Card>
    </ScreenContainer>
  );
};

export default HomeScreen;
