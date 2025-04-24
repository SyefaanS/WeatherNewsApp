

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NewsScreen from '@/app/screens/NewsScreen';

// Mock Redux store setup
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Test data
const mockArticles = [
  {
    title: "React Native 2025 Released",
    description: "Exciting new features announced!",
    url: "https://example.com/react-native-2025",
  },
  {
    title: "Expo SDK 50 Now Available",
    description: null,
    url: "https://example.com/expo-sdk-50",
  },
];

describe("NewsScreen", () => {
  it("shows loading spinner", () => {
    const store = mockStore({
      news: {
        articles: [],
        loading: true,
        error: null,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <NewsScreen />
      </Provider>
    );

    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("displays error message", async () => {
    const store = mockStore({
      news: {
        articles: [],
        loading: false,
        error: "Failed to load news",
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <NewsScreen />
      </Provider>
    );

    expect(getByText("Error: Failed to load news")).toBeTruthy();
  });

  it("renders list of news articles", async () => {
    const store = mockStore({
      news: {
        articles: mockArticles,
        loading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <NewsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("React Native 2025 Released")).toBeTruthy();
      expect(getByText("Exciting new features announced!")).toBeTruthy();
      expect(getByText("Expo SDK 50 Now Available")).toBeTruthy();
      expect(getByText("N/A")).toBeTruthy(); // For null description
    });
  });
});
