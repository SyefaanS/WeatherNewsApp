import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "@/app/screens/HomeScreen";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// Mocks
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() =>
    Promise.resolve(
      JSON.stringify({ username: "John", email: "john@example.com" })
    )
  ),
  removeItem: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useFocusEffect: jest.fn((cb) => cb()),
  };
});

const mockStore = configureStore([thunk]);

describe("HomeScreen", () => {
  it("renders loading state", async () => {
    const store = mockStore({
      weather: { data: null, loading: true, error: null },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <HomeScreen navigation={{ replace: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );

    await waitFor(() => {
      expect(getByTestId("ActivityIndicator")).toBeTruthy();
    });
  });

  it("shows weather data and username", async () => {
    const store = mockStore({
      weather: {
        data: {
          name: "New York",
          main: { temp: 25 },
        },
        loading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={{ replace: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Welcome, John!")).toBeTruthy();
      expect(getByText("john@example.com")).toBeTruthy();
      expect(getByText("Weather in New York")).toBeTruthy();
      expect(getByText("Temperature: 25°C")).toBeTruthy();
    });
  });

  it("handles weather fetch error", async () => {
    const store = mockStore({
      weather: { data: null, loading: false, error: "Failed to fetch" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={{ replace: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );

    expect(getByText(/Error: Failed to fetch/)).toBeTruthy();
  });
});
